import { configDotenv } from "dotenv";
import axios from "axios";

configDotenv();
const {} = process.env;
export const getMediaController = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const access_token = authHeader.split(" ")[1];
    const response = await axios.get(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,like_count,comments_count,thumbnail_url,timestamp,username&access_token=${access_token}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching media:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
