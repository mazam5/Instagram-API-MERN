import axios from "axios";
import { configDotenv } from "dotenv";

configDotenv();
const {
  LOGIN_OAUTH_BASE,
  CLIENT_ID,
  FRONTEND_BASE,
  GRAPH_ACCESS_TOKEN,
  CLIENT_SECRET,
} = process.env;

const redirectUri =
  "https://instagram-api-mern.onrender.com/api/auth/instagram/callback";
const encodedRedirectUri = encodeURIComponent(redirectUri);

export const handleInstagramLogin = (req, res) => {
  const embedUrl =
    "https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=1653002872006320&redirect_uri=https://instagram-api-mern.onrender.com/api/auth/instagram/callback&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights";
  // const redirect = `https://${LOGIN_OAUTH_BASE}/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodedRedirectUri}&scope=${SCOPES}&response_type=code`;
  // console.log(`Redirecting to Instagram login: ${redirect}`);
  res.redirect(embedUrl);
};

export const handleInstagramCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("Missing 'code' in query.");
  }

  try {
    const form = new URLSearchParams();
    form.append("client_id", CLIENT_ID);
    form.append("client_secret", CLIENT_SECRET);
    form.append("grant_type", "authorization_code");
    form.append("redirect_uri", redirectUri);
    form.append("code", code);

    console.log("Form data for token exchange:", form);
    console.log("Redirect URI:", redirectUri);
    console.log("Encoded Redirect URI:", encodedRedirectUri);

    const tokenResponse = await axios.post(
      `https://${LOGIN_OAUTH_BASE}/access_token`,
      form,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Access Token received:", tokenResponse.data);
    const { access_token, user_id } = tokenResponse.data;

    const longTokenRes = await axios.get(
      `https://${GRAPH_ACCESS_TOKEN}/access_token`,
      {
        params: {
          grant_type: "ig_exchange_token",
          client_secret: CLIENT_SECRET,
          access_token: access_token,
        },
      }
    );
    console.log("Long-lived token response:", longTokenRes.data);
    const longLivedToken = longTokenRes.data.access_token;
    // res.cookie("access_token", longLivedToken, {
    //   httpOnly: false,
    //   secure: false,
    //   sameSite: "Lax",
    //   maxAge: 60 * 60 * 24 * 30, // 30 days
    // });

    return res.redirect(
      // `${FRONTEND_BASE}/dashboard?token=${longLivedToken}&user=${user_id}`
      `${FRONTEND_BASE}/dashboard?user_id=${user_id}&access_token=${longLivedToken}`
    );
  } catch (error) {
    console.error(
      "Token exchange failed:",
      error.response?.data || error.message
    );
    return res.status(500).send("Instagram login failed. Please try again.");
  }
};
