import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const HomePage = () => {
  const [profile, setProfile] = useState({
    id: "",
    username: "",
    account_type: "",
    media_count: 0,
  });
  const [media, setMedia] = useState([
    {
      id: "",
      caption: "",
      media_url: "",
      permalink: "",
      media_type: "",
      timestamp: "",
    },
  ]);
  const [search] = useSearchParams();

  useEffect(() => {
    const access_token =
      search.get("access_token") || localStorage.getItem("access_token");
    const userId = search.get("user_id");

    localStorage.setItem("access_token", access_token || "");

    if (access_token && userId) {
      fetchUserProfile(access_token, parseInt(userId));
      fetchUserMedia(access_token, parseInt(userId));
    }
  }, []);
  const fetchUserProfile = async (token: string, userId: number) => {
    console.log("Fetching user profile...");
    console.log("Token:", token);
    console.log("User ID:", userId);

    try {
      const res = await axios.get(
        `https://graph.instagram.com/${userId}?fields=id,username,name,website,has_profile_pic,media_count,follows_count,followers_count,biography&access_token=${token}`,
      );
      console.log(res.data);

      setProfile(res.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  const fetchUserMedia = async (token: string, userId: number) => {
    try {
      const res = await axios.get(
        `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,permalink,media_type,timestamp&access_token=${token}`,
      );
      setMedia(res.data.data);
    } catch (error) {
      console.error("Failed to fetch media:", error);
    }
  };

  return (
    <div className="h-screen w-full">
      <div className="flex">
        {profile && (
          <div className="mb-4">
            <h2 className="text-xl font-bold">{profile.username}</h2>
            <p>ID: {profile.id}</p>
            <p>Type: {profile.account_type}</p>
            <p>Total Posts: {profile.media_count}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {media.map((item) => (
            <div key={item.id} className="rounded border p-2">
              <p>{item.caption}</p>
              {item.media_type === "IMAGE" && (
                <img src={item.media_url} alt="post" className="w-full" />
              )}
              <p className="text-xs text-gray-500">{item.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
