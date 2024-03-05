import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';

const MyCalendar = () => {
  const calendarRef = useRef(null);
  // Removed externalEvents and uniqueEmployeeNames as they are no longer needed for display

  // Helper function to transform employee availability into a format suitable for your API, if needed
  //function to calculate the dates of availability and repeat for 4 weeks.
  const transformEmployeeAvailabilityToScheduleData = (employees) => {
    const events = [];
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Assuming the availability object is like { Monday: true, Tuesday: false, ... }
    employees.forEach(employee => {
      daysOfWeek.forEach((day, index) => {
        if (employee.availability[day]) {
          // For simplicity, let's just create an event on the next occurrence of each day
          let date = new Date(); // Start from today
          date.setDate(date.getDate() + ((index + 7 - date.getDay()) % 7)); // Get next occurrence of the day
          if (date.getDay() !== index) date.setDate(date.getDate() + 7); // Ensure it's the next week

          // Create an event for the next 4 occurrences (4 weeks)
          for (let i = 0; i < 4; i++) {
            events.push({
              title: `${employee.firstName} ${employee.lastName}`,
              start: new Date(date.getFullYear(), date.getMonth(), date.getDate() + i * 7).toISOString().split('T')[0],
            });
          }
        }
      });
    });

    return events;
  };

  const sendScheduleDataToDatabase = async (scheduleData) => {
    try {
      await axios.post('http://localhost:5001/api/schedules', scheduleData);
      console.log('Schedule data successfully sent to the database');
    } catch (error) {
      console.error("Failed to send schedule data", error);
    }
  };

  useEffect(() => {
    const fetchEmployeesAndPrepareAndSendSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/employees');
        const scheduleData = transformEmployeeAvailabilityToScheduleData(response.data);
        sendScheduleDataToDatabase(scheduleData);
      } catch (error) {
        console.error("Failed to fetch employees or send data", error);
      }
    };

    fetchEmployeesAndPrepareAndSendSchedules();
  }, []);

  useEffect(() => {
    const calendarEl = calendarRef.current;

    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      editable: true,
      headerToolbar: {
        left: '',
        center: 'title',
        right: 'prev,next today'
      },
      // Removed the events: externalEvents since we are no longer displaying employees on the calendar
    });

    calendar.render();

    return () => calendar.destroy();
  }, []); // Removed the dependency on externalEvents since it's no longer used

  return (
    <>
      <div className="calendar-container">
        <div className="calendar" ref={calendarRef}></div>
      </div>
    </>
  );
};

export default MyCalendar;
