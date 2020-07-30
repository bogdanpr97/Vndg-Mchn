import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth';

import './Navbar.css';

const Navbar = ({ auth: { loading, isAuthenticated }, logout }) => {
  const guestLinks = [
    <Link className="link-button" to="/login"><span className="link-text">Login</span></Link>,
    <Link className="link-button" to="/register"><span className="link-text">Register</span></Link>
  ];

  const userLinks = [
    <Link className="link-button" to="/items"><span className="link-text">Add Items</span></Link>,
    <a href="/" className="link-button" onClick={logout} ><span className="link-text">Logout</span></a>
  ];

  return (
    <div className="navbar-container">
      <div className="navbar-title-container">
        <Link className="navbar-title" to="/">
          <h1 className="navbar-text">Vndg-Mchn</h1>
        </Link>
      </div>
      {!loading && 
      isAuthenticated ? [...userLinks] : [...guestLinks]}
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);