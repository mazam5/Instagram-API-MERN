import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const Dashboard = () => {
  const [params] = useSearchParams();
  const token = params.get("access_token");
  const userId = params.get("user_id");
  const [profile, setProfile] = useState();
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(
        `https://graph.instagram.com/me?fields=id,username,account_type,media_count&access_token=${token}`,
      );
      setProfile(res.data);
    };

    const fetchMedia = async () => {
      const res = await axios.get(
        `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,comments_count&access_token=${token}`,
      );
      setMedia(res.data.data);
    };

    fetchProfile();
    fetchMedia();
  }, [token]);

  return (
    <div className="p-6">
      {profile && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Welcome, {profile.username}</h2>
          <p>Account Type: {profile.account_type}</p>
          <p>Media Count: {profile.media_count}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {media.map((item) => (
          <div key={item.id} className="rounded-lg border p-4 shadow">
            <img
              src={item.media_url}
              alt={item.caption}
              className="h-auto w-full"
            />
            <p>{item.caption}</p>
            <small>{new Date(item.timestamp).toLocaleString()}</small>
            {/* You can add a button here to fetch/display comments */}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
