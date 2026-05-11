import { useEffect, useState } from "react";

export default function MyProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("profile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  if (!profile) return <p style={{ textAlign: "center" }}>No profile yet.</p>;

  return (
    <div style={{ maxWidth: 500, margin: "20px auto" }}>
      <h2>My Profile</h2>

      <p><b>Name:</b> {profile.name}</p>
      <p><b>Major:</b> {profile.major}</p>
      <p><b>Year:</b> {profile.year}</p>
      <p><b>Classes:</b> {profile.classes}</p>
      <p><b>Interests:</b> {profile.interests}</p>
      <p><b>Bio:</b> {profile.bio}</p>
    </div>
  );
}