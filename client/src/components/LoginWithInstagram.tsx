import { Instagram } from "lucide-react";
import { Button } from "./ui/button";
const LoginWithInstagram = () => {
  const { VITE_APP_ID, VITE_BACKEND_URL } = import.meta.env;
  const redirectUri = encodeURIComponent(
    `${VITE_BACKEND_URL}/api/auth/instagram/callback`,
  );

  const navigateToInstagramLogin = () => {
    const authUrl = `https://www.instagram.com/oauth/authorize?client_id=${VITE_APP_ID}&redirect_uri=${redirectUri}&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights&response_type=code`;
    window.location.href = authUrl;
  };
  return (
    <div>
      <Button
        className="flex cursor-pointer items-center gap-2 text-xl"
        onClick={navigateToInstagramLogin}
      >
        <Instagram size={48} />
        Login With Instagram
      </Button>
    </div>
  );
};
export default LoginWithInstagram;
