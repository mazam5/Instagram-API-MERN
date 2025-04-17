import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const Profile = () => {
  const [profile, setProfile] = useState({
    id: "",
    profile_picture_url: "",
    username: "",
    name: "",
    website: "",
    biography: "",
    follows_count: 0,
    followers_count: 0,
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
      username: "",
      like_count: 0,
      comments: [],
      comments_count: 0,
      thumbnail_url: "",
    },
  ]);
  const [search] = useSearchParams();

  useEffect(() => {
    const access_token =
      search.get("access_token") || localStorage.getItem("access_token");
    const userId = search.get("user_id");

    localStorage.setItem("access_token", access_token || "");

    if (access_token && userId) {
      fetchUserProfile(access_token);
      fetchUserMedia(access_token);
    }
  }, []);
  const fetchUserProfile = async (token: string) => {
    try {
      const res = await axios.get(
        `https://graph.instagram.com/me?fields=id,username,name,website,media_count,follows_count,profile_picture_url,followers_count,biography&access_token=${token}`,
      );
      console.log(res.data);

      setProfile(res.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  const fetchUserMedia = async (token: string) => {
    try {
      const res = await axios.get(
        `https://graph.instagram.com/me/media?fields=caption,media_type,media_url,permalink,like_count,comments,comments_count,thumbnail_url,timestamp,username&access_token=${token}`,
      );
      setMedia(res.data.data);
    } catch (error) {
      console.error("Failed to fetch media:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center p-4">
      {profile && (
        <div className="mb-4 border border-gray-400">
          <div className="flex gap-4">
            <div>
              {profile.profile_picture_url && (
                <img
                  src={profile.profile_picture_url}
                  alt="Profile"
                  className="h-24 w-24 rounded-full border-2 border-gray-300"
                />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold">{profile.username}</h2>
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-semibold">{profile.media_count}</p>
                  <p>Posts</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-semibold">{profile.followers_count}</p>
                  <p>Followers</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-semibold">{profile.follows_count}</p>
                  <p>Following</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid w-1/3 grid-cols-1 gap-4 md:grid-cols-2">
        {media.map((item) => (
          <div
            key={item.id}
            className="rounded border border-gray-300 p-2 shadow-xl"
          >
            <a
              href={item.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-white text-center no-underline"
            >
              {item.media_url && (
                <img
                  src={item.media_url}
                  alt="Instagram Post"
                  className="h-full w-full rounded-lg object-cover"
                />
              )}
            </a>
            <p className="mt-2 text-sm">{item.caption}</p>
            <p className="text-xs text-gray-500">
              {new Date(item.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Profile;
