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
    <div className="profile-page">
      <div className="profile-card">
        <h2>Create Profile</h2>
        <p className="profile-subtitle">
          Add your campus info so other students can connect with you.
        </p>

        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            placeholder="Name"
            value={profile.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Major</label>
          <input
            name="major"
            placeholder="Major"
            value={profile.major}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Year</label>
          <select name="year" value={profile.year} onChange={handleChange}>
            <option value="">Select Year</option>
            <option>Freshman</option>
            <option>Sophomore</option>
            <option>Junior</option>
            <option>Senior</option>
          </select>
        </div>

        <div className="form-group">
          <label>Classes</label>
          <input
            name="classes"
            placeholder="Classes (comma separated)"
            value={profile.classes}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Interests</label>
          <input
            name="interests"
            placeholder="Interests (comma separated)"
            value={profile.interests}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            placeholder="Bio"
            value={profile.bio}
            onChange={handleChange}
          />
        </div>

        <button className="full-button" onClick={handleSave}>
          Save Profile
        </button>
      </div>
    </div>
  );
}

