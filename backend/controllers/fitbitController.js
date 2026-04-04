import { fitbitConfig } from "../config/fitbit.js";
import admin from "firebase-admin";
import serviceAccount from "../serviceAccount.json" with { type: "json" };
import {
    generateCodeChallenge,
    generateCodeVerifier,
    exchangeCodeForTokens,
    fetchDailyStats,
    revokeToken,
} from "../utils/fitbitService.js";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "kaizenfit-e6633.appspot.com",
    });
}

export const getAuthUrl = async (req, res) => {
    const verifier = generateCodeVerifier();
    const challenge = generateCodeChallenge(verifier);
    const statePayload = Buffer.from(
        JSON.stringify({ uid: req.user?.uid, verifier }),
        "utf8"
    ).toString("base64url");

    const params = new URLSearchParams({
        response_type: "code",
        client_id: fitbitConfig.clientId,
        scope: fitbitConfig.scope,
        redirect_uri: fitbitConfig.redirectUri,
        code_challenge: challenge,
        code_challenge_method: "S256",
        state: statePayload,
    });

    const url = `${fitbitConfig.authUrl}?${params.toString()}`;

    res.json({ url, verifier });
};

export const handleCallback = async (req, res) => {
    const frontendDashboardUrl = `${fitbitConfig.frontendAppUrl}/dashboard`;
    const code = req.query.code ?? req.body?.code;
    const incomingState = req.query.state ?? req.body?.state ?? req.body?.verifier;
    const authError = req.query.error;
    const authErrorDescription = req.query.error_description;

    if (authError) {
        const reason = encodeURIComponent(String(authErrorDescription || authError));
        const status = String(authError) === "access_denied" ? "cancelled" : "failed";
        return res.redirect(`${frontendDashboardUrl}?fitbit=${status}&reason=${reason}`);
    }

    let verifier = null;
    let uid = req.query.uid ?? req.body?.uid;

    if (incomingState) {
        try {
            const decoded = JSON.parse(Buffer.from(incomingState, "base64url").toString("utf8"));
            verifier = decoded?.verifier ?? null;
            uid = uid ?? decoded?.uid;
        } catch {
            // Backward-compatible fallback for older verifier-only state.
            verifier = incomingState;
        }
    }

    if (!code || !verifier) {
        return res.redirect(`${frontendDashboardUrl}?fitbit=failed&reason=missing_code_or_verifier`);
    }

    try {
        const tokens = await exchangeCodeForTokens(code, verifier);

        if (uid) {
            try {
                await admin.firestore().collection("users").doc(uid).set(
                    {
                        integrations: {
                            fitbit: {
                                connected: true,
                                userId: tokens.user_id,
                                accessToken: tokens.access_token,
                                refreshToken: tokens.refresh_token,
                                scope: tokens.scope,
                                tokenType: tokens.token_type,
                                expiresIn: tokens.expires_in,
                                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                            },
                        },
                    },
                    { merge: true }
                );
            } catch (firestoreError) {
                const reason = encodeURIComponent(String(firestoreError?.message || "firestore_save_failed"));
                return res.redirect(`${frontendDashboardUrl}?fitbit=connected&persist=failed&reason=${reason}`);
            }
        }

        return res.redirect(`${frontendDashboardUrl}?fitbit=connected`);
    } catch (error) {
        const reason = encodeURIComponent(String(error?.message || "token_exchange_failed"));
        return res.redirect(`${frontendDashboardUrl}?fitbit=failed&reason=${reason}`);
    }
};

export const getDashData = async (req, res) => {
    try {
        // For now, read Fitbit token from explicit request data.
        // Do not use Authorization header because it carries your app auth token.
        const accessToken =
            req.headers["x-fitbit-access-token"] ||
            req.query.accessToken ||
            req.body?.accessToken;

        if (!accessToken) {
            return res.status(400).json({ message: "Missing Fitbit access token" });
        }

        const data = await fetchDailyStats(accessToken);
        
        res.json(data);
    }
    catch (error) {
        // If error is 401, this is where you would call fitbitService.refreshFitbitToken()
        res.status(500).json({ message: "Failed to fetch Fitbit data" });
    }
}

export const disconnect = async (req, res) => {
    try {
        const token = req.body?.token || req.headers["x-fitbit-access-token"];
        if (!token) {
            return res.status(400).json({ message: "Missing token" });
        }

        await revokeToken(token);

        if (req.user?.uid) {
            await admin.firestore().collection("users").doc(req.user.uid).set(
                {
                    integrations: {
                        fitbit: {
                            connected: false,
                            accessToken: null,
                            refreshToken: null,
                            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                        },
                    },
                },
                { merge: true }
            );
        }

        res.json({ message: "Disconnected successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to disconnect" });
    }
};


