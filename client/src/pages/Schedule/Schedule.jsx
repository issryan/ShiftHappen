import React from 'react';
import MyCalendar from '../../components/Calendar/Calendar.jsx';
import Sidebar from '../../components/sideBar/sideBar.jsx';
import "./Schedule.css"

const Calendar = () => {
  return (
     <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <div id="calendar">
          <MyCalendar/>
        </div>
      </div>
    </div>
  );
}

export default Calendar;