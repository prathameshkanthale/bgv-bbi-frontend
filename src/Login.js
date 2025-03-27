import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const navigate = useNavigate(); // Initialize navigate function

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Credentails :" ,email);
      console.log("Credentails :" ,password);
      const response = await fetch("/user/validateUser", {
        method: "POST",
        
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailId: email, password: password }), // Prepare data for API
      });
        console.log("response",response);
      if (response.ok) {
        const result = await response.json(); // Assuming the response is in JSON format.
        
        console.log(result);
        // Assuming the backend returns a role. Adjust this based on your API response structure
        if (result.role === "ADMIN") {
          navigate("/admin"); // Redirect to Admin page
        } else {
          navigate("/user",{state:{userData:result}}); // Redirect to User page
        }
      } else {
        const errorMessage = await response.text(); // Get error message from response
        setError(errorMessage);
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