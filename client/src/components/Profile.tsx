import { MEDIA, PROFILE } from "@/utils/types";
import axios from "axios";
import { AtSign, FileUser, IdCard, Link } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import InstagramMediaCard from "./InstagramMediaCard";

const Profile = () => {
  const [profile, setProfile] = useState<PROFILE>();
  const [media, setMedia] = useState([]);
  const [search] = useSearchParams();
  const { VITE_SERVER_BASEURL } = import.meta.env;

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
      const res = await axios.get(`${VITE_SERVER_BASEURL}/api/userdata`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(res.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  const fetchUserMedia = async (token: string) => {
    try {
      const res = await axios.get(`${VITE_SERVER_BASEURL}/api/media`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMedia(res.data.data);
    } catch (error) {
      console.error("Failed to fetch media:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center p-4">
      {profile && (
        <div className="mx-auto mb-4">
          <div className="flex gap-4">
            {/* profile photo section */}
            <div>
              {profile.profile_picture_url && (
                <img
                  src={profile.profile_picture_url}
                  alt="Profile"
                  className="h-28 rounded-full border-2 border-gray-300 md:h-48 md:w-48"
                />
              )}
            </div>
            <div className="flex flex-col items-start justify-center gap-3">
              <div className="flex">
                <AtSign className="mr-2 h-6 w-6" />
                <p className="text-lg font-semibold">{profile.username} </p>
              </div>
              <div className="flex">
                <IdCard className="mr-2 h-6 w-6" />
                <p className="text-gray-600">{profile.name}</p>
              </div>
              <div className="flex">
                <FileUser className="mr-2 h-6 w-6" />
                <p className="text-gray-600">{profile.biography}</p>
              </div>
              <div className="flex">
                <Link className="mr-2 h-6 w-6" />
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {profile.website}
                </a>
              </div>
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
        {media.map((item: MEDIA) => (
          <div key={item.id} className="rounded p-2">
            <InstagramMediaCard item={item} profile={profile!} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Profile;
