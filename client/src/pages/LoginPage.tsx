import LoginWithInstagram from "@/components/LoginWithInstagram";

const LoginPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-between gap-4 rounded-lg bg-white p-4 shadow-lg md:h-2/3 md:p-8">
        <h2 className="text-sm font-semibold md:text-2xl">
          A Demo Instagram App using MERN Stack with Instagram Login API
        </h2>
        <LoginWithInstagram />
        <div className="flex items-center justify-between gap-4 text-xs md:text-lg">
          <p className="font-semibold">By Azam</p>
          <p>
            <a
              href="https://github.com/mazam5/Instagram-API-MERN"
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              Github Repo
            </a>
          </p>
          <p>
            <a
              href="https://www.linkedin.com/in/azam5"
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
