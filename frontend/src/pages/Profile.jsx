import { useState, useEffect } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    major: "",
    year: "",
    classes: "",
    interests: "",
    bio: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("profile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSave() {
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile saved!");
  }

  return (
    <div style={{ maxWidth: 500, margin: "20px auto" }}>
      <h2>Create Profile</h2>

      <input name="name" placeholder="Name" value={profile.name} onChange={handleChange} /><br /><br />
      <input name="major" placeholder="Major" value={profile.major} onChange={handleChange} /><br /><br />

      <select name="year" value={profile.year} onChange={handleChange}>
        <option value="">Select Year</option>
        <option>Freshman</option>
        <option>Sophomore</option>
        <option>Junior</option>
        <option>Senior</option>
      </select><br /><br />

      <input name="classes" placeholder="Classes (comma separated)" value={profile.classes} onChange={handleChange} /><br /><br />
      <input name="interests" placeholder="Interests (comma separated)" value={profile.interests} onChange={handleChange} /><br /><br />

      <textarea name="bio" placeholder="Bio" value={profile.bio} onChange={handleChange} /><br /><br />

      <button onClick={handleSave}>Save Profile</button>
    </div>
  );
}