import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router";
import axios from "axios";

const Dashboard = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams(location.search);
  const token = searchParams.get("token");
  const userId = searchParams.get("user");

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

  useEffect(() => {
    if (token && userId) {
      fetchUserProfile();
      fetchUserMedia();
    }
  }, [token, userId]);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(
        `https://graph.instagram.com/${userId}?fields=id,username,account_type,media_count&access_token=${token}`,
      );
      setProfile(res.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  const fetchUserMedia = async () => {
    try {
      const res = await axios.get(
        `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type,timestamp&access_token=${token}`,
      );
      setMedia(res.data.data);
    } catch (error) {
      console.error("Failed to fetch media:", error);
    }
  };

  return (
    <div className="p-4">
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
  );
};

export default Dashboard;
