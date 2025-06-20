import React from 'react';
import './Header.css';
import { Link, useNavigate } from "react-router-dom"; 

const Header = ({User}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem("userToken"); 
    navigate("/" ); 
  };

  return (
    <nav className="user-navbar">
      
      <ul className="nav-links">
        <li><Link to="/user">Home</Link></li> 
        <li><Link to="/user/start-bgv" state={{User}}>Start BGV</Link></li> 
        <li><Link to="/user/change-password"  state={{User}}>Change Password</Link></li>
        <li><Link to="/user/contact-us">Contact Us</Link></li>
      </ul>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Header;
