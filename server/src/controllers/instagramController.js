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
    const tokenResponse = await axios.post(
      `https://api.instagram.com/oauth/access_token`,
      {
        params: {
          client_id: META_APP_ID,
          client_secret: META_APP_SECRET,
          grant_type: "authorization_code",
          redirect_uri: REDIRECT_URI,
          code: code,
        },
      }
    );

    const { access_token, user_id } = tokenResponse.data;
    console.log("Short-lived token response:", tokenResponse.data);

    // Step 2: Exchange for long-lived token
    // const longLivedTokenResponse = await axios.get(
    //   `https://graph.instagram.com/access_token`,
    //   {
    //     params: {
    //       grant_type: "ig_exchange_token",
    //       client_secret: META_APP_SECRET,
    //       access_token: access_token,
    //     },
    //   }
    // );

    // const longLivedAccessToken = longLivedTokenResponse.data.access_token;
    // console.log("Long-lived access token:", longLivedAccessToken);

    // Step 3: Redirect with token
    res.redirect(`${FRONTEND_URL}/dashboard?token=${access_token}`);
  } catch (error) {
    console.error(
      "Error exchanging code for token:",
      error.response?.data || error.message
    );
    res.status(500).send("Authentication failed");
  }
};
