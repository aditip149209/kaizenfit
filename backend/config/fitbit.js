import dotenv from 'dotenv'
dotenv.config()

export const fitbitConfig = {
    clientId: process.env.OAUTH2_CLIENT_ID,
    clientSecret: process.env.FITBIT_CLIENT_SECRET,
    redirectUri: process.env.FITBIT_REDIRECT_URL,
    authUrl: process.env.FITBIT_AUTHORIZATION_URI,
    tokenUrl: process.env.FITBIT_ACCESS_TOKEN_REQUEST_URI,
    frontendAppUrl: process.env.FRONTEND_APP_URL || 'http://localhost:5173',
    scope: 'heartrate activity'
}