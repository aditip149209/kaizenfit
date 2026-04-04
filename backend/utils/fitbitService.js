import axios from "axios";
import crypto from "crypto";
import { fitbitConfig } from "../config/fitbit.js";

export const generateCodeVerifier = () => {
    return crypto.randomBytes(32).toString("base64url");
};

export const generateCodeChallenge = (verifier) => {
    return crypto.createHash("sha256").update(verifier).digest("base64url");
};

export const exchangeCodeForTokens = async (code, verifier) => {
    const clientCredentials = Buffer.from(
        `${fitbitConfig.clientId}:${fitbitConfig.clientSecret}`
    ).toString("base64");

    try {
        const response = await axios.post(
            fitbitConfig.tokenUrl,
            new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: fitbitConfig.clientId,
                redirect_uri: fitbitConfig.redirectUri,
                code: code,
                code_verifier: verifier
            }).toString(),
            {
                headers: {
                    Authorization: `Basic ${clientCredentials}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );
        return response.data;
    } catch (error) {
        const fitbitErrors = error.response?.data?.errors;
        const fitbitMessage = Array.isArray(fitbitErrors)
            ? fitbitErrors.map((item) => item?.message).filter(Boolean).join("; ")
            : null;
        const fallbackMessage = error.response?.data?.error_description || error.response?.data?.message || error.message;
        const reason = fitbitMessage || fallbackMessage || "unknown_fitbit_error";

        console.error("Fitbit Token Exchange Error:", error.response?.data || error.message);
        throw new Error(`token_exchange_failed:${reason}`);
    }
};

export const refreshFitbitToken = async (refreshToken) => {
    const clientCredentials = Buffer.from(
        `${fitbitConfig.clientId}:${fitbitConfig.clientSecret}`
    ).toString("base64");

    try {
        const response = await axios.post(
            fitbitConfig.tokenUrl,
            new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            }).toString(),
            {
                headers: {
                    Authorization: `Basic ${clientCredentials}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Fitbit token refresh error:", error.response?.data || error.message);
        throw new Error("Failed to refresh fitbit token");
    }
};

export const fetchDailyStats = async (accessToken, date = "today") => {
    try {
        const response = await axios.get(
            `https://api.fitbit.com/1/user/-/activities/date/${date}.json`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Accept-Language": "en_US" // Ensures units are consistent
                }
            }
        );
        
        // This returns an object containing: summary (steps, calories, etc.) and goals
        return response.data;
    } catch (error) {
        console.error("Fetch Stats Error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * 2. Revoke Access Token
 * Tells Fitbit to invalidate the token immediately (logout/disconnect).
 */
export const revokeToken = async (token) => {
    // Fitbit requires Basic Auth for revocation as well
    const clientCredentials = Buffer.from(
        `${fitbitConfig.clientId}:${fitbitConfig.clientSecret}`
    ).toString("base64");

    try {
        await axios.post(
            "https://api.fitbit.com/oauth2/revoke",
            new URLSearchParams({ token }).toString(),
            {
                headers: {
                    Authorization: `Basic ${clientCredentials}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );
        return { success: true };
    } catch (error) {
        console.error("Revoke Token Error:", error.response?.data || error.message);
        throw error;
    }
};



