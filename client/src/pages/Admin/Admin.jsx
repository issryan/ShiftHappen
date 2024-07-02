import React from 'react';
import AdminPage from '../../components/Admin/AdminPage.jsx';
import Sidebar from '../../components/sideBar/sideBar.jsx';

const Admin = () => {
    return (
       <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <div id="calendar">
            <AdminPage/>
          </div>
        </div>
      </div>
    );
  }
  
  export default Admin;