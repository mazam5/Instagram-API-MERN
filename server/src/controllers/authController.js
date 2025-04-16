import axios from "axios";
import { configDotenv } from "dotenv";

configDotenv();
const { META_APP_ID, META_APP_SECRET, REDIRECT_URI, FRONTEND_URL } =
  process.env;

export const handleInstagramCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("Missing 'code' in query.");
  }

  try {
    const form = new URLSearchParams();
    form.append("client_id", META_APP_ID);
    form.append("client_secret", META_APP_SECRET);
    form.append("grant_type", "authorization_code");
    form.append("redirect_uri", REDIRECT_URI);
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
    console.log("Access Token received:", tokenResponse.data);

    const longTokenRes = await axios.get(
      `https://graph.instagram.com/access_token`,
      {
        params: {
          grant_type: "ig_exchange_token",
          client_secret: META_APP_SECRET,
          access_token: access_token,
        },
      }
    );

    const longLivedToken = longTokenRes.data.access_token;

    return res.redirect(
      `${FRONTEND_URL}/dashboard?token=${longLivedToken}&user=${user_id}`
    );
  } catch (error) {
    console.error(
      "Token exchange failed:",
      error.response?.data || error.message
    );
    return res.status(500).send("Instagram login failed. Please try again.");
  }
};
