import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="admin-card" onClick={() => navigate('/add-employee')}>
          <h3>Add New Employee</h3>
          <button className="admin-button">Add Employee</button>
        </div>
        <div className="admin-card" onClick={() => navigate('/view-schedule')}>
          <h3>View Schedule</h3>
          <button className="admin-button">View Schedule</button>
        </div>
        <div className="admin-card" onClick={() => navigate('/export-schedule')}>
          <h3>Export Schedule</h3>
          <button className="admin-button">Export Schedule</button>
        </div>
      </div>
      <div className="admin-body">
        {/* Placeholder for additional content */}
      </div>
    </div>
  );
};

export default AdminDashboard;