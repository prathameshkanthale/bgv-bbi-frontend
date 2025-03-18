import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "../Styles/admin.css";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Clear token
    navigate("/"); // Redirect to login page
  };

  return (
    <div>
      <header className="navbar">
        <nav>
          <ul>
            <li><Link to="/admin">Home</Link></li>
            <li><Link to="/admin/add-user">Add User</Link></li> 
            <li><Link to="/admin/user-details">User Details</Link></li>
            {/* <li><Link to="/admin/search-user">Search User</Link></li> */}
            {/* <li><Link to="/admin/contact-us">Contact Us</Link></li> */}
          </ul>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <div className="content">
        <Outlet /> {/* This renders child routes (Home, Add User, etc.) */}
      </div>
    </div>
  );
};

export default AdminLayout;
