import axios from "axios";

const {
  META_APP_ID,
  META_APP_SECRET,
  REDIRECT_URI,
  INSTAGRAM_HOST_URL,
  META_OAUTH_BASE,
  FRONTEND_URL,
} = process.env;

export const handleInstagramCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("No code provided");
  } else {
    console.log("Code received:", code);
  }

  try {
    // Step 1: Exchange code for short-lived access token
    const form = new URLSearchParams();
    form.append("client_id", process.env.META_APP_ID);
    form.append("client_secret", process.env.META_APP_SECRET);
    form.append("grant_type", "authorization_code");
    form.append("redirect_uri", process.env.REDIRECT_URI);
    form.append("code", code);

    const tokenResponse = await axios.post(
      "https://api.instagram.com/oauth/access_token",
      form,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, user_id } = tokenResponse.data;
    console.log("✅ Short-lived token acquired:", tokenResponse.data);

    // Step 2: Exchange for long-lived token
    const longLivedTokenResponse = await axios.get(
      `https://graph.instagram.com/access_token`,
      {
        params: {
          grant_type: "ig_exchange_token",
          client_secret: META_APP_SECRET,
          access_token: access_token,
        },
      }
    );

    const longLivedAccessToken = longLivedTokenResponse.data.access_token;
    console.log("Long-lived access token:", longLivedAccessToken);

    // Step 3: Redirect with token
    res.redirect(`${FRONTEND_URL}/dashboard?token=${longLivedAccessToken}`);
  } catch (error) {
    console.error(
      "Error exchanging code for token:",
      error.response?.data || error.message
    );
    res.status(500).send("Authentication failed");
  }
};
