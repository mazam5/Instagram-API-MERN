import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:token/:userId" element={<Dashboard />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/home/:token/:userId" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
