import { configDotenv } from "dotenv";
import axios from "axios";

configDotenv();
const {} = process.env;
export const getMediaController = async (req, res) => {
  const { userId } = req.params;
  try {
    const { access_token } = req.query;
    const response = await axios.get(
      `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink,like_count,comments_count,thumbnail_url,timestamp,username&access_token=${access_token}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching media:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
