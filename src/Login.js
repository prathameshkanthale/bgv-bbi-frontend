import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./components/context/AuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Access login function from context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Credentials:", email, password);
      
      const response = await fetch("/user/validateUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailId: email, password }),
      });

      const result = await response.json();
      console.log("Result:", result);

      if (response.ok) {
        // Store token (or user role if needed)
        login(result.token); // Save token in AuthContext & localStorage

        if (result.role === "ADMIN") {
          navigate("/admin"); // Redirect to Admin
        } else {
          navigate("/user/start-bgv", { state: { userData: result } }); // Redirect to BGV page
        }
      } else {
        setError(result.response === "no password match" ? "Password is incorrect" : result.response || "Login failed.");
        setShowForgotPassword(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again later.");
      setShowForgotPassword(true);
    }
  };

  return (
    <div className="login-wrapper">
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
