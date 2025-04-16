import { Instagram } from "lucide-react";
import { Button } from "./ui/button";
const LoginWithInstagram = () => {
  const { VITE_BACKEND_URL } = import.meta.env;
  const navigateToInstagramLogin = () => {
    const loginUrl = `${VITE_BACKEND_URL}/api/auth/instagram`;
    window.location.href = loginUrl;
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
