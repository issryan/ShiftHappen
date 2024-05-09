import React from 'react';
import Nav from '../components/sideBar/sideBar.jsx';
import MyCalendar from '../components/Calendar/Calendar.jsx';

const Calendar = () => {
  return (
    <>
    <Nav/>
    <div>
      <MyCalendar />
    </div>
    </>
  );
}

export default Calendar;