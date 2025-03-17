import React from "react";
import { Link } from "react-router-dom";
import "../Styles/admin.css";

const Admin = () => {
  return (
    <div>
      <header className="navbar">
        <nav>
          <ul>
            <li><Link to="/admin">Home</Link></li>
            <li><Link to="/admin/add-user">Add User</Link></li> {/* Make sure this is correct */}
            <li><Link to="#">User Details</Link></li>
            <li><Link to="#">Search User</Link></li>
          </ul>
        </nav>
      </header>
      <div className="content">
        <h2>Welcome, Admin!</h2>
      </div>
    </div>
  );
};

export default Admin;
