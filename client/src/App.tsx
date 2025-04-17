import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/:token/:userId" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
