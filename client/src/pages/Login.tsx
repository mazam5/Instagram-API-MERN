import LoginWithInstagram from "@/components/LoginWithInstagram";
import { Link } from "react-router";

const Login = () => {
  return (
    <div>
      <LoginWithInstagram />
      <div className="my-2 flex flex-col justify-between">
        <p className="text-center">
          <Link to="/dashboard" className="text-blue-500 hover:underline">
            Go to Dashboard
          </Link>
        </p>
        <p className="text-center">
          <Link to="/home" className="text-blue-500 hover:underline">
            Go to Home
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
