import { Instagram } from "lucide-react";
import { Button } from "./ui/button";
const LoginWithInstagram = () => {
  const { VITE_APP_ID, VITE_REDIRECT_URI, VITE_SCOPES, VITE_OAUTH_URL } =
    import.meta.env;

  const navigateToInstagramLogin = () => {
    // const { VITE_BACKEND_URL } = import.meta.env;
    // window.location.href = `${VITE_BACKEND_URL}/auth/instagram`;
    const authUrl = `https://${VITE_OAUTH_URL}?client_id=${VITE_APP_ID}&redirect_uri=${encodeURIComponent(VITE_REDIRECT_URI)}&scope=${VITE_SCOPES}&response_type=code`;
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
