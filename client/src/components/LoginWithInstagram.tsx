import { Instagram } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";

const LoginWithInstagram = () => {
  const { VITE_SERVER_BASEURL } = import.meta.env;
  const navigateToInstagramLogin = () => {
    const loginUrl = `${VITE_SERVER_BASEURL}/api/auth/instagram`;
    window.location.href = loginUrl;
  };
  return (
    <div>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-orange-400 via-gray-300 to-green-500 py-3 text-sm font-semibold text-black shadow-md transition duration-300 hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:text-white md:text-xl"
              onClick={navigateToInstagramLogin}
            >
              <Instagram className="h-6 w-6" />
              Login With Instagram
            </Button>
          </TooltipTrigger>
          <TooltipContent className="">
            Use Instagram Business/Creator account to access content.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
export default LoginWithInstagram;
