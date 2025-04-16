import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { CookiesProvider, useCookies } from "react-cookie";
function App() {
  const [cookies, setCookie] = useCookies();
  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <div className="flex h-screen items-center justify-center">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:token/:userId" element={<Dashboard />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/home/:token/:userId" element={<Dashboard />} />
        </Routes>
      </div>
    </CookiesProvider>
  );
}

export default App;
