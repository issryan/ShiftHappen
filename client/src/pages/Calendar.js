import Nav from '../components/Nav'
import React from 'react';
import MyCalendar from '../components/Calendar.jsx';
import Footer from '../components/Footer';

const Calendar = () => {
  return (
    <>
    <Nav/>
    <div>
      <h1>My App</h1>
      <MyCalendar />
    </div>
    <Footer/>
    </>
  );
}

export default Calendar;