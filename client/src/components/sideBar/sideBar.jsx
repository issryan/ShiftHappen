import React from 'react';
import { IconDashboard, IconUsers,IconCalendarMonth, IconCloudUpload, IconSettings } from '@tabler/icons-react';import './sideBar.css';
import logo from './../../assets/shift-logo.png'


function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="sidebar-menu">
        <button className="menu-item"><IconDashboard /></button>
        <button className="menu-item"><IconUsers /></button>
        <button className="menu-item"><IconCalendarMonth /></button>
        <button className="menu-item"><IconCloudUpload /></button>
        <button className="menu-item"><IconSettings /></button>
      </div>
    </div>
  );
}

export default Sidebar;
