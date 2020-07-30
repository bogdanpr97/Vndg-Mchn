import React from 'react';
import { Link } from 'react-router-dom'

import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-title-container">
        <Link className="navbar-title" to="/">
          <h1 className="navbar-text">Vndg-Mchn</h1>
        </Link>
      </div>
      <Link className="link-button" to="/login"><span className="link-text">Login</span></Link>
      <Link className="link-button" to="/register"><span className="link-text">Register</span></Link>
    </div>
  );
};

export default Navbar;