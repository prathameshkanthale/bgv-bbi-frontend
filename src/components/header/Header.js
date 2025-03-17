import React from 'react'
import './Header.css';
import { Link } from "react-router-dom"; 


const Header = () => {
  return (
    <div>
       <nav className="user-navbar">
              <ul>
                <li><Link to="/user">Home</Link></li> 
                <li><Link to="/user/start-bgv">Start BGV</Link></li> 
                <li><Link to="/user/change-password">Change Password</Link></li>
      
              </ul>
            </nav>
    </div>
  )
}

export default Header
