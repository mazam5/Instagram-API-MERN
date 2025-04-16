import axios from "axios";

const { META_APP_ID, META_APP_SECRET, REDIRECT_URI, FRONTEND_URL } =
  process.env;

export const postAccessToken = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("No code provided");
  } else {
    console.log("Code received:", code);
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
    console.log("Short-lived token acquired:", tokenResponse.data);
    res.redirect(
      `${FRONTEND_URL}/dashboard?token=${access_token}&user_id=${user_id}`
    );
  } catch (error) {
    console.error(
      "Error exchanging code for token:",
      error.response?.data || error.message
    );
    res.status(500).send("Authentication failed");
  }
};

export const getLongAccessToken = async (req, res) => {
  const { access_token } = req.query;

  if (!access_token) {
    return res.status(400).send("Missing parameters");
  } else {
    console.log("Parameters received:", {
      access_token,
    });
  }

  try {
    const response = await axios.get(
      `https://graph.instagram.com/access_token`,
      {
        params: {
          client_secret: META_APP_SECRET,
          grant_type: "ig_exchange_token",
          access_token: access_token,
        },
      }
    );
  } catch (error) {
    console.error(
      "Error exchanging code for token:",
      error.response?.data || error.message
    );
    res.status(500).send("Authentication failed");
  }
};
