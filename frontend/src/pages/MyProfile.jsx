import { useEffect, useState } from "react";

// This component displays the user's saved profile information
export default function MyProfile() {
  // State to store the user's profile data
  const [profile, setProfile] = useState(null);

  // useEffect runs once when the component loads
  useEffect(() => {
    // Get the saved profile from localStorage
    const saved = localStorage.getItem("profile");

    // If a profile exists, convert it from a string to an object
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []); // Empty dependency array means this runs only once on mount

  // If no profile exists, show a message instead of the profile page
  if (!profile) return <p style={{ textAlign: "center" }}>No profile yet.</p>;

  return (
    // Container for styling and layout
    <div style={{ maxWidth: 500, margin: "20px auto" }}>
      <h2>My Profile</h2>

      {/* Display each piece of profile information */}
      <p><b>Name:</b> {profile.name}</p>
      <p><b>Major:</b> {profile.major}</p>
      <p><b>Year:</b> {profile.year}</p>
      <p><b>Classes:</b> {profile.classes}</p>
      <p><b>Interests:</b> {profile.interests}</p>
      <p><b>Bio:</b> {profile.bio}</p>
    </div>
  );
}