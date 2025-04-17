import axios from "axios";
import { configDotenv } from "dotenv";

configDotenv();
const { CLIENT_ID, FRONTEND_BASE, CLIENT_SECRET } = process.env;

const redirectUri =
  "https://instagram-api-mern.onrender.com/api/auth/instagram/callback";
const encodedRedirectUri = encodeURIComponent(redirectUri);

export const handleInstagramLogin = (req, res) => {
  const embedUrl = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${CLIENT_ID}&redirect_uri=https://instagram-api-mern.onrender.com/api/auth/instagram/callback&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish`;
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

    const tokenResponse = await axios.post(
      `https://api.instagram.com/oauth/access_token`,
      form,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, user_id } = tokenResponse.data;

    const longTokenRes = await axios.get(
      `https://graph.instagram.com/access_token`,
      {
        params: {
          grant_type: "ig_exchange_token",
          client_secret: CLIENT_SECRET,
          access_token: access_token,
        },
      }
    );
    const longLivedToken = longTokenRes.data.access_token;
    // res.cookie("access_token", longLivedToken, {
    //   httpOnly: false,
    //   secure: false,
    //   sameSite: "Lax",
    //   maxAge: 60 * 60 * 24 * 30, // 30 days
    // });

    return res.redirect(
      // `${FRONTEND_BASE}/dashboard?token=${longLivedToken}&user=${user_id}`
      `${FRONTEND_BASE}/home?user_id=${user_id}&access_token=${longLivedToken}`
    );
  } catch (error) {
    console.error(
      "Token exchange failed:",
      error.response?.data || error.message
    );
    return res.status(500).send("Instagram login failed. Please try again.");
  }
};
