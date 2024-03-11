import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';

const MyCalendar = () => {
  const calendarRef = useRef(null);
  const [externalEvents, setExternalEvents] = useState([]);
  const [uniqueEmployeeNames, setUniqueEmployeeNames] = useState([]); // For displaying unique employee names

  //function to generate 4 events per day selected
  const transformEmployeeAvailabilityToEvents = (employees) => {
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


  useEffect(() => {
    const fetchEmployeesAndPrepareEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/employees');
        const events = transformEmployeeAvailabilityToEvents(response.data);
        setExternalEvents(events);
        // Extract unique employee names for the external events container
        const uniqueNames = Array.from(new Set(response.data.map(emp => `${emp.firstName} ${emp.lastName}`)));
        setUniqueEmployeeNames(uniqueNames);
      } catch (error) {
        console.error("Failed to fetch employees", error);
      }
    };

    fetchEmployeesAndPrepareEvents();
  }, []);

  useEffect(() => {
    const calendarEl = calendarRef.current;

    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: ' ',
        center: 'title',
        right: 'prev,next today'
      },
      events: externalEvents
    });

    calendar.render();

    return () => calendar.destroy();
  }, [externalEvents]);

  return (
    <>
      <div className="calendar-container">
        <div className="external-events-container">
          <div className="external-events-header">Employee List</div>
          {uniqueEmployeeNames.map((name, index) => (
            <div key={index} className="fc-event">{name}</div>
          ))}
        </div>
        <div className="calendar" ref={calendarRef}></div>
      </div>
    </>
  );
};

export default MyCalendar;