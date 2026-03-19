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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>

      <input
        placeholder="Campus Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}