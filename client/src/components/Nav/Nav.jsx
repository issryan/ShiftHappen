import React from 'react';
import './Nav.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Shift Happens</div>

      <div className="sitemap">
        <a href="/demos" className="navLink">Demos</a>
        <a href="/features" className="navLink">Features</a>
        <a href="/contact" className="navLink">Contact</a>
      </div>

      <div className="buttonsContainer">
        <button className="loginButton">Log In</button>
        <button className="getStartedButton">Get Started</button>
      </div>
    </nav>
  );
}

export default Navbar;
