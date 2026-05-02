import { useState, useEffect } from "react";

// This component allows the user to create and edit their profile
export default function Profile() {
  // State to store all profile fields
  const [profile, setProfile] = useState({
    name: "",
    major: "",
    year: "",
    classes: "",
    interests: "",
    bio: "",
  });

  // Load saved profile data when the component first renders
  useEffect(() => {
    const saved = localStorage.getItem("profile");

    // If data exists in localStorage, parse it and update state
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  // Handle changes for all input fields
  function handleChange(e) {
    const { name, value } = e.target;

    // Update only the field that changed while keeping the rest the same
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Save profile data to localStorage
  function handleSave() {
    // Convert the profile object into a string before saving
    localStorage.setItem("profile", JSON.stringify(profile));

    // Notify the user that their profile has been saved
    alert("Profile saved!");
  }

  return (
    // Container for layout and styling
    <div style={{ maxWidth: 500, margin: "20px auto" }}>
      <h2>Create Profile</h2>

      {/* Input for name */}
      <input
        name="name"
        placeholder="Name"
        value={profile.name}
        onChange={handleChange}
      /><br /><br />

      {/* Input for major */}
      <input
        name="major"
        placeholder="Major"
        value={profile.major}
        onChange={handleChange}
      /><br /><br />

      {/* Dropdown for selecting year */}
      <select name="year" value={profile.year} onChange={handleChange}>
        <option value="">Select Year</option>
        <option>Freshman</option>
        <option>Sophomore</option>
        <option>Junior</option>
        <option>Senior</option>
      </select><br /><br />

      {/* Input for classes (comma-separated list) */}
      <input
        name="classes"
        placeholder="Classes (comma separated)"
        value={profile.classes}
        onChange={handleChange}
      /><br /><br />

      {/* Input for interests (comma-separated list) */}
      <input
        name="interests"
        placeholder="Interests (comma separated)"
        value={profile.interests}
        onChange={handleChange}
      /><br /><br />

      {/* Text area for bio */}
      <textarea
        name="bio"
        placeholder="Bio"
        value={profile.bio}
        onChange={handleChange}
      /><br /><br />

      {/* Button to save profile */}
      <button onClick={handleSave}>Save Profile</button>
    </div>
  );
}