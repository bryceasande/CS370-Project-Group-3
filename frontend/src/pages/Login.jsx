import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    if (!email.endsWith(".edu")) {
      alert("Use a campus email (.edu)");
      return;
    }

    localStorage.setItem("user", email);
    navigate("/profile");
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        <p className="login-subtitle">Use your campus email to continue.</p>

        <input
          placeholder="Campus Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}