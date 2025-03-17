import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css";
import Admin from "./components/admin/Admin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const navigate = useNavigate(); // Initialize navigate function

  const handleLogin = (e) => {
    e.preventDefault();

    const validEmail = "user@example.com";
    const validPassword = "password123";
    const role ="ADMIN"; 

    if (email === validEmail && password === validPassword) {
      alert("Login Successful!");
      setError("");
      setShowForgotPassword(false);

      navigate("/user"); // Redirect to User page
    } else {
      setError("Invalid email or password");
      setShowForgotPassword(true);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Logo in the top-left corner */}
      <img
        src="https://bbinsight.com/hs-fs/hubfs/BBI_Navy_Medium_Website.png?width=100&height=48&name=BBI_Navy_Medium_Website.png"
        alt="Company Logo"
        className="logo"
      />

      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          {showForgotPassword && (
            <p className="forgot-password">
              <a href="#">Forgot Password?</a>
            </p>
          )}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
