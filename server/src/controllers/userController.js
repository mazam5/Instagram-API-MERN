import axios from "axios";

export const getUserDataController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { access_token } = req.query;

    if (!userId || !access_token) {
      return res.status(400).json({ error: "Missing userId or access_token" });
    }

    const response = await axios.get(
      `https://graph.instagram.com/${userId}?fields=id,username,name,biography,followers_count,media_count,website,follows_count,has_profile_pic&access_token=${access_token}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Internal Server Error");
  }
};
