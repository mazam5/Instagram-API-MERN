import axios from "axios";

export const getUserDataController = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const access_token = authHeader.split(" ")[1];

    const response = await axios.get(
      `https://graph.instagram.com/me?fields=id,username,name,website,media_count,follows_count,profile_picture_url,followers_count,biography&access_token=${access_token}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Internal Server Error");
  }
};
