import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MyProfile from "./pages/MyProfile";
import Discover from "./pages/Discover";

// Navigation bar component with links to different pages
function NavBar() {
  return (
    // Simple navigation bar styling
    <nav style={{ padding: "16px", background: "#e9eef6", marginBottom: "20px" }}>
      
      {/* Link to Login page */}
      <Link to="/" style={{ marginRight: "15px" }}>Login</Link>

      {/* Link to Profile editing page */}
      <Link to="/profile" style={{ marginRight: "15px" }}>Edit Profile</Link>

      {/* Link to view saved profile */}
      <Link to="/my-profile" style={{ marginRight: "15px" }}>My Profile</Link>

      {/* Link to discover other students */}
      <Link to="/discover">Discover</Link>
    </nav>
  );
}

// Main App component that sets up routing
export default function App() {
  return (
    // BrowserRouter enables navigation between pages without refreshing
    <BrowserRouter>
      
      {/* Show navigation bar on all pages */}
      <NavBar />

      {/* Define all routes (pages) for the app */}
      <Routes>
        
        {/* Route for Login page */}
        <Route path="/" element={<Login />} />

        {/* Route for creating/editing profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Route for viewing saved profile */}
        <Route path="/my-profile" element={<MyProfile />} />

        {/* Route for discovering other students */}
        <Route path="/discover" element={<Discover />} />
      </Routes>
    </BrowserRouter>
  );
}