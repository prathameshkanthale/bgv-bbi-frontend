import React, { useState } from "react";
import "../Styles/AddUser.css"; // Ensure this file exists

const AddUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`User Added!\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPassword: ${password}`);
  };

  return (
    <div className="add-user-container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email ID:</label>
          <input
            type="email"
            placeholder="Enter Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
