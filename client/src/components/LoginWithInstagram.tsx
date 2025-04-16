import { Instagram } from "lucide-react";
import { Button } from "./ui/button";
const LoginWithInstagram = () => {
  // const { VITE_APP_ID, VITE_REDIRECT_URI, VITE_SCOPES, VITE_OAUTH_URL } =
  //   import.meta.env;

  const navigateToInstagramLogin = () => {
    const authUrl =
      "https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=1653002872006320&redirect_uri=https://instagram-api-mern.onrender.com/api/auth/instagram/callback&response_type=code&scope=instagram_business_basic%%2Cinstagram_business_manage_comments";

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
