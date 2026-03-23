import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const token = localStorage.getItem("token");

  if (token) return null;

  const handleLogin = async () => {
    if (!email || !password) {
      alert("All fields required ❌");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      alert("Login Success ✅");
      window.location.reload();
    } catch (err) {
      alert("Login failed ❌");
    }
  };

  return (
    <>
      <div className="login-header">Admin Login</div>

      <div className="login-container">
        <div className="login-box">
          <h2>Admin Login</h2>

  
          <div className="input-group">
            <i>📧</i>
            <input
              type="email"
              placeholder="Email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

           
          <div className="input-group">
            <i>🔒</i>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>👁</span>
          </div>

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;