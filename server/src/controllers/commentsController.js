import { configDotenv } from "dotenv";
import axios from "axios";

configDotenv();
const {} = process.env;

export const getCommentsByMediaId = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const { media_id } = req.query;

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const access_token = authHeader.split(" ")[1];

    const response = await axios.get(
      `https://graph.instagram.com/${media_id}/comments`,
      {
        params: {
          access_token: access_token,
          fields: "id,from,like_count,parent_id,replies,text,user,username",
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching comments:", error.config);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllRepliesToComment = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const { comment_id } = req.params;

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }
    const access_token = authHeader.split(" ")[1];
    const response = await axios.get(
      `https://graph.instagram.com/${comment_id}/replies`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching replies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postReplyToComment = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const { comment_id, message } = req.params;

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }
    const access_token = authHeader.split(" ")[1];
    const request = await axios.post(
      `http://graph.instagram.com/${comment_id}/replies?message=${message}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error posting reply:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
