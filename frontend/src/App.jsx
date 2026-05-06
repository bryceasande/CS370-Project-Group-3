import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MyProfile from "./pages/MyProfile";
import Discover from "./pages/Discover";

// Navigation bar component with links to different pages
function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">Friend App</div>

      <div className="nav-links">
        <Link to="/">Login</Link>
        <Link to="/profile">Edit Profile</Link>
        <Link to="/my-profile">My Profile</Link>
        <Link to="/discover">Discover</Link>
      </div>
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