import React from 'react';
import './Nav.css';
import logo from '/Users/ryanarafeh/Desktop/Projects/Shift/client/src/assets/shift-logo.png';

const Navbar = () => {
  return (
    <nav id="nav">
    <img src={logo} className='logo' alt="Website Logo" />
    <div>
      <ul class="nav-links">
        <li><a href="/home">Home</a></li>
        <li><a href="/schedule">Experience</a></li>
        <li><a href="/employees">Projects</a></li>
        <li><a href="/about">Contact</a></li>
        <li><a href="/login">Login/Sign up</a></li>

      </ul>
    </div>
  </nav>
  );
};

export default Navbar;
