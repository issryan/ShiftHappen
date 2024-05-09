import React from 'react';
import { FaUserFriends, FaBriefcase, FaCloudDownloadAlt, FaCog } from 'react-icons/fa';
import './sideBar.css';
import logo from './../../assets/shift-logo.png'


function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="sidebar-menu">
        <button className="menu-item"><FaUserFriends /></button>
        <button className="menu-item"><FaBriefcase /></button>
        <button className="menu-item"><FaCloudDownloadAlt /></button>
        <button className="menu-item"><FaCog /></button>
      </div>
    </div>
  );
}

export default Sidebar;
