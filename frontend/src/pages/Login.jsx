import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Login component allows a user to enter their email and log in
export default function Login() {
  // State to store the email entered by the user
  const [email, setEmail] = useState("");

  // Hook used to programmatically navigate to another page
  const navigate = useNavigate();

  // Function that runs when the user clicks the Login button
  function handleLogin() {
    // Check if the email ends with ".edu"
    if (!email.endsWith(".edu")) {
      // Show an alert if it's not a valid campus email
      alert("Use a campus email (.edu)");
      return; // Stop the function from continuing
    }

    // Save the user's email in localStorage (acts like simple storage in browser)
    localStorage.setItem("user", email);

    // Redirect the user to the profile page after login
    navigate("/profile");
  }

  return (
    // Container for the login UI
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>

      {/* Input field where user types their email */}
      <input
        placeholder="Campus Email"
        value={email} // Controlled input tied to state
        onChange={(e) => setEmail(e.target.value)} // Update state when user types
      /><br /><br />

      {/* Button that triggers login */}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}