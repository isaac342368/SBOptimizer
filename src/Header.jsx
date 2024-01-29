import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Import NavLink for active link styling
import { useState, useEffect } from 'react';
import "./Home.css";
import logoSrc from './assets/newSBLogo.png';

function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark-custom">
        <Link to="/">
          <img src={logoSrc} alt="Home" className="logo-image" />
        </Link>
        <div className="navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              
              <NavLink // Use NavLink instead of a for active link styling
                style={{ fontSize: 12 }}
                className="nav-link"
                activeClassName="active" // Define a CSS class for active links
                exact // Use exact to match only the home page link exactly
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                style={{ fontSize: 12 }}
                className="nav-link"
                activeClassName="active"
                to="/spread"
              >
                Spread
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                style={{ fontSize: 12 }}
                className="nav-link"
                activeClassName="active"
                to="/moneyline"
              >
                Money Line
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                style={{ fontSize: 12 }}
                className="nav-link"
                activeClassName="active"
                to="/playerprops"
              >
                Player Props
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink
                style={{ fontSize: 12 }}
                className="nav-link"
                activeClassName="active"
                to="/contactus"
              >
                Contact
              </NavLink> */}
            {/* </li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
