import { fitbitConfig } from "../config/fitbit.js";
import admin from "firebase-admin";
import serviceAccount from "../serviceAccount.json" with { type: "json" };
import {
    generateCodeChallenge,
    generateCodeVerifier,
    exchangeCodeForTokens,
    fetchDailyStats,
    refreshFitbitToken,
    revokeToken,
} from "../utils/fitbitService.js";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "kaizenfit-e6633.appspot.com",
    });
}

const saveFitbitTokens = async (uid, tokens) => {
    await admin.firestore().collection("users").doc(uid).set(
        {
            integrations: {
                fitbit: {
                    connected: true,
                    userId: tokens.user_id,
                    accessToken: tokens.access_token ?? tokens.accessToken ?? null,
                    refreshToken: tokens.refresh_token ?? tokens.refreshToken ?? null,
                    scope: tokens.scope,
                    tokenType: tokens.token_type,
                    expiresIn: tokens.expires_in,
                    expiresAt: Date.now() + (Number(tokens.expires_in ?? 0) * 1000),
                    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                },
            },
        },
        { merge: true }
    );
};

const loadFitbitIntegration = async (uid) => {
    const snapshot = await admin.firestore().collection("users").doc(uid).get();
    return snapshot.exists ? snapshot.data()?.integrations?.fitbit ?? null : null;
};

const clearFitbitIntegration = async (uid) => {
    await admin.firestore().collection("users").doc(uid).set(
        {
            integrations: {
                fitbit: {
                    connected: false,
                    accessToken: null,
                    refreshToken: null,
                    expiresAt: null,
                    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                },
            },
        },
        { merge: true }
    );
};

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
                await saveFitbitTokens(uid, tokens);
            } catch (firestoreError) {
                const reason = encodeURIComponent(String(firestoreError?.message || "firestore_save_failed"));
                return res.redirect(`${frontendDashboardUrl}?fitbit=failed&persist=failed&reason=${reason}`);
            }
        }

        return res.redirect(`${frontendDashboardUrl}?fitbit=connected`);
    } catch (error) {
        const reason = encodeURIComponent(String(error?.message || "token_exchange_failed"));
        return res.redirect(`${frontendDashboardUrl}?fitbit=failed&reason=${reason}`);
    }
};

export const getFitbitStats = async (req, res) => {
    const uid = req.user?.uid;

    if (!uid) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const fitbit = await loadFitbitIntegration(uid);

        if (!fitbit?.connected || !fitbit.accessToken) {
            return res.status(200).json({ connected: false });
        }

        let accessToken = fitbit.accessToken;

        try {
            const data = await fetchDailyStats(accessToken);

            return res.json({
                connected: true,
                fitbit: {
                    userId: fitbit.userId ?? null,
                    connected: true,
                    updatedAt: fitbit.updatedAt ?? null,
                },
                stats: data,
            });
        } catch (statsError) {
            const statusCode = statsError?.response?.status;

            if (statusCode !== 401 || !fitbit.refreshToken) {
                throw statsError;
            }

            const refreshedTokens = await refreshFitbitToken(fitbit.refreshToken);
            accessToken = refreshedTokens.access_token;
            await saveFitbitTokens(uid, {
                ...refreshedTokens,
                user_id: fitbit.userId,
            });

            const refreshedStats = await fetchDailyStats(accessToken);

            return res.json({
                connected: true,
                fitbit: {
                    userId: fitbit.userId ?? null,
                    connected: true,
                    updatedAt: Date.now(),
                },
                stats: refreshedStats,
                refreshed: true,
            });
        }
    } catch (error) {
        console.error("Failed to fetch Fitbit stats:", error.response?.data || error.message);
        return res.status(500).json({ message: "Failed to fetch Fitbit data" });
    }
}

export const disconnect = async (req, res) => {
    try {
        const uid = req.user?.uid;
        if (!uid) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const fitbit = await loadFitbitIntegration(uid);
        const token = fitbit?.accessToken || fitbit?.refreshToken;
        if (!token) {
            await clearFitbitIntegration(uid);
            return res.json({ message: "Disconnected successfully" });
        }

        await revokeToken(token);

        await clearFitbitIntegration(uid);

        res.json({ message: "Disconnected successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to disconnect" });
    }
};

export const getDashData = getFitbitStats;


