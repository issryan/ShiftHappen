import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import './Calendar.css'
import axios from 'axios';

const MyCalendar = () => {
  const calendarRef = useRef(null);
  const externalEventsRef = useRef(null);
  const checkboxRef = useRef(null);
  const [externalEvents, setExternalEvents] = useState([]); // Updated to allow setting events

  useEffect(() => {
    // Fetch employees and set as external events
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/employees');
        const employeeEvents = response.data.map(employee => ({
          id: employee._id, // Assuming your backend uses MongoDB
          title: `${employee.firstName} ${employee.lastName}`
        }));
        setExternalEvents(employeeEvents);
      } catch (error) {
        console.error("Failed to fetch employees", error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    const externalEventsEl = externalEventsRef.current;
    const checkbox = checkboxRef.current;

    const draggable = new Draggable(externalEventsEl, {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
        let title = eventEl.innerText;
        return { title };
      }
    });

    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      headerToolbar: {
        left: '',
        center: 'title',
        right: 'prev,next today'
      },
      editable: true,
      droppable: true,
      drop: function (info) {
        if (checkbox && checkbox.checked) {
          info.draggedEl.parentNode.removeChild(info.draggedEl);
        }
      },
      events: externalEvents
    });

    calendar.render();

    return () => {
      calendar.destroy();
      draggable.destroy();
    };
  }, [externalEvents]); // Dependency array ensures this effect runs when externalEvents changes

  return (
    <>
      <div className="calendar-container">
        <div className="external-events-container" ref={externalEventsRef}>
          <div className="external-events-header">Employee List</div>
          {externalEvents.map(event => (
            <div key={event.id} className="fc-event">{event.title}</div>
          ))}
        </div>
        <div className="calendar" ref={calendarRef}></div>
      </div>
    </>
  );
};

export default MyCalendar;