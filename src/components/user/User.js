import React from "react";
import { Outlet } from "react-router-dom"; 

import "../Styles/User.css"; 
import Header from '../header/Header';

const User = () => {
  return (
    <div>
      {/* <nav className="user-navbar">
        <ul>
          <li><Link to="/user">Home</Link></li> 
          <li><Link to="/user/start-bgv">Start BGV</Link></li> 
          <li><Link to="/user/change-password">Change Password</Link></li>

        </ul>
      </nav> */}
      <Header />
      <div className="user-content">
        {/* <h2>Welcome, User</h2>
        <p>Start your background verification process.</p> */}
        <Outlet />
      </div>
    </div>
  );
};

export default User;
