import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MyProfile from "./pages/MyProfile";
import Discover from "./pages/Discover";

function NavBar() {
  return (
    <nav style={{ padding: "16px", background: "#e9eef6", marginBottom: "20px" }}>
      <Link to="/" style={{ marginRight: "15px" }}>Login</Link>
      <Link to="/profile" style={{ marginRight: "15px" }}>Edit Profile</Link>
      <Link to="/my-profile" style={{ marginRight: "15px" }}>My Profile</Link>
      <Link to="/discover">Discover</Link>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/discover" element={<Discover />} />
      </Routes>
    </BrowserRouter>
  );
}