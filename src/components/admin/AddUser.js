import React, { useState } from "react";
import "../Styles/AddUser.css"; // Ensure this file exists

const AddUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a user object from the form data
    const user = {
      firstName,
      lastName,
      email,
      password,
      role,
    };

    try {
      // Make a POST request to the backend
      const response = await fetch("/user-login/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      alert(`User Added Successfully!\nUser ID: ${data.firstName}`);
      console.log(data.id);
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. Please try again.");
    }
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

        <div className="form-group">
          <label>Role:</label>
          <input
            type="text"
            placeholder="Enter Role as USER or ADMIN"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
