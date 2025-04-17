import { MEDIA, PROFILE } from "@/utils/types";
import axios from "axios";
import { AtSign, FileUser, IdCard, Link } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import InstagramMediaCard from "./InstagramMediaCard";
import { Skeleton } from "./ui/skeleton";
import { ScrollArea } from "./ui/scroll-area";

const Profile = () => {
  const [loading, setLoading] = useState(true);
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
      Promise.all([
        fetchUserProfile(access_token),
        fetchUserMedia(access_token),
      ]).then(() => setLoading(false));
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
    <div className="mx-auto flex flex-col items-center justify-center">
      {loading ? (
        <div className="mx-auto mb-4 h-full w-full">
          <div className="flex justify-between gap-4">
            <Skeleton className="h-28 w-28 rounded-full md:h-48 md:w-48" />
            <div className="flex w-full flex-col gap-3">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-2/5" />
              <div className="flex justify-between gap-4">
                <Skeleton className="h-10 w-16" />
                <Skeleton className="h-10 w-16" />
                <Skeleton className="h-10 w-16" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        profile && (
          <div className="mx-auto mb-4">
            <div className="flex justify-between gap-4">
              <div>
                {profile.profile_picture_url && (
                  <img
                    src={profile.profile_picture_url}
                    alt="Profile"
                    className="h-16 w-16 rounded-full md:h-48 md:w-48 md:border-2 md:border-gray-300"
                  />
                )}
              </div>
              <div className="flex flex-col items-start justify-center gap-3">
                <div className="flex">
                  <AtSign className="mr-2 h-6 w-6" />
                  <p className="text-lg font-semibold">{profile.username}</p>
                </div>
                {profile.name && (
                  <div className="flex">
                    <IdCard className="mr-2 h-6 w-6" />
                    <p className="text-gray-600">{profile.name}</p>
                  </div>
                )}
                {profile.biography && (
                  <div className="flex">
                    <FileUser className="mr-2 h-6 w-6" />
                    <p className="text-gray-600">{profile.biography}</p>
                  </div>
                )}
                {profile.website && (
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
                )}
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
        )
      )}

      <ScrollArea className="h-full w-full rounded-xl border-y-2 shadow-xl md:h-[44rem]">
        <div className="mx-auto grid w-5/6 grid-cols-1 gap-4 md:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="rounded p-2">
                  <Skeleton className="h-72 w-full rounded-xl" />
                </div>
              ))
            : media.map((item: MEDIA) => (
                <div key={item.id} className="rounded p-2">
                  <InstagramMediaCard item={item} profile={profile!} />
                </div>
              ))}
        </div>
      </ScrollArea>
    </div>
  );
};
export default Profile;
