import React from 'react';
import Employee from '../../components/Employee/Employees.jsx';
import Sidebar from '../../components/sideBar/sideBar.jsx';
import "./Employee.css"

const Calendar = () => {
  return (
     <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <div id="calendar">
          <Employee/>
        </div>
      </div>
    </div>
  );
}

export default Calendar;