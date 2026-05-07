import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    if (!email.endsWith(".edu")) {
      alert("Use a campus email (.edu)");
      return;
    }

    if (password.length < 4) {
      alert("Password must be at least 4 characters for the demo.");
      return;
    }

    const user = {
      email: email,
      password: password,
    };

    localStorage.setItem("user", JSON.stringify(user));
    navigate("/profile");
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        <p className="login-subtitle">Use your campus email to continue.</p>

        <div className="login-form-group">
          <input
            placeholder="Campus Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}