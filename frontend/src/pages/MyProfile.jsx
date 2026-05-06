import { useEffect, useState } from "react";

// This component displays the user's saved profile information
export default function MyProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("profile");

    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  if (!profile) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h2>My Profile</h2>
          <p className="profile-subtitle">No profile has been created yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>My Profile</h2>
        <p className="profile-subtitle">
          This is the information currently saved to your profile.
        </p>

        <div className="profile-info">
          <p><b>Name:</b> {profile.name}</p>
          <p><b>Major:</b> {profile.major}</p>
          <p><b>Year:</b> {profile.year}</p>
          <p><b>Classes:</b> {profile.classes}</p>
          <p><b>Interests:</b> {profile.interests}</p>
          <p><b>Bio:</b> {profile.bio}</p>
        </div>
      </div>
    </div>
  );
}