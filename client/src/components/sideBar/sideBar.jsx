import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconDashboard, IconUsers, IconCalendarMonth, IconCloudUpload, IconSettings } from '@tabler/icons-react'; import './sideBar.css';
import logo from './../../assets/shift-logo.png'


function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h1 className='logo2'>SHIFT HAPPENS</h1>
      </div>
      <div className="sidebar-menu">
        <button className="menu-item" onClick={() => navigate('/dashboard')}><IconDashboard /></button>
        <button className="menu-item" onClick={() => navigate('/employees')}><IconUsers /></button>
        <button className="menu-item" onClick={() => navigate('/schedule')}><IconCalendarMonth /></button>
        <button className="menu-item" onClick={() => navigate('/upload')}><IconCloudUpload /></button>
        <button className="menu-item" onClick={() => navigate('/settings')}><IconSettings /></button>
      </div>
    </div>
  );
}

export default Sidebar;
