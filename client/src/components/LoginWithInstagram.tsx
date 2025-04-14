import { Instagram } from "lucide-react";
import { Button } from "./ui/button";
const LoginWithInstagram = () => {
  // const { VITE_BACKEND_URL } = import.meta.env;

  return (
    <div>
      <Button className="flex cursor-pointer items-center gap-2 text-xl">
        <Instagram size={48} />
        Login With Instagram
      </Button>
    </div>
  );
};
export default LoginWithInstagram;
