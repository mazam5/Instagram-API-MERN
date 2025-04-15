import express from "express";
const router = express.Router();
import { configDotenv } from "dotenv";
configDotenv();

const { META_APP_ID, META_APP_SECRET, REDIRECT_URI } = process.env;

router.get("/instagram/callback", async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange code for short-lived access token
    const tokenResponse = await axios.post(
      `https://${META_OAUTH_BASE}/access_token`,
      null,
      {
        params: {
          client_id: META_APP_ID,
          client_secret: META_APP_SECRET,
          grant_type: "authorization_code",
          redirect_uri: REDIRECT_URI,
          code,
        },
      }
    );

    const { access_token, user_id } = tokenResponse.data;

    // Optionally, exchange for a long-lived token
    const longLivedTokenResponse = await axios.get(
      "https://graph.instagram.com/access_token",
      {
        params: {
          grant_type: "ig_exchange_token",
          client_secret: META_APP_SECRET,
          access_token,
        },
      }
    );

    const longLivedAccessToken = longLivedTokenResponse.data.access_token;

    // Redirect to frontend with token (consider using HTTP-only cookies or sessions for security)
    res.redirect(
      `http://localhost:3000/dashboard?token=${longLivedAccessToken}`
    );
  } catch (error) {
    console.error(
      "Error exchanging code for token:",
      error.response?.data || error.message
    );
    res.status(500).send("Authentication failed");
  }
});

export default router;
