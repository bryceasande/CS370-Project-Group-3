import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MyProfile from "./pages/MyProfile";
import Discover from "./pages/Discover";
import Events from "./pages/Events";

// Navigation bar component with links to different pages
function NavBar() {
  const savedUser = localStorage.getItem("user");

  let user = {};

  try {
    user = savedUser ? JSON.parse(savedUser) : {};
  } catch {
    user = { email: savedUser };
  }

  function handleLogout() {
  localStorage.clear();
  window.location.href = "/";
}

  return (
    <nav className="navbar">
      <div className="nav-brand">Friend App</div>

      <div className="nav-links">
        <Link to="/">Login</Link>
        <Link to="/profile">Edit Profile</Link>
        <Link to="/my-profile">My Profile</Link>
        <Link to="/discover">Discover</Link>
        <Link to="/events">Events</Link>

        {user.email && <span className="nav-user">{user.email}</span>}

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}


export default function App() {
  return (
    
    <BrowserRouter>
      
      {}
      <NavBar />

      {}
      <Routes>
        
        {}
        <Route path="/" element={<Login />} />

        {}
        <Route path="/profile" element={<Profile />} />

        {/* Route for viewing saved profile */}
        <Route path="/my-profile" element={<MyProfile />} />

        {/* Route for discovering other students */}
        <Route path="/discover" element={<Discover />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </BrowserRouter>
  );
}