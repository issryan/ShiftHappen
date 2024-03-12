import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';

const MyCalendar = () => {
  const calendarRef = useRef(null);
  const [uniqueEmployeeNames] = useState([]); // For displaying unique employee names


  useEffect(() => {
    const calendarEl = calendarRef.current;
    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: '',
        center: 'title',
        right: 'prev,next today'
      },
      events: function (fetchInfo, successCallback, failureCallback) {
        fetch(`/api/eventsInRange?start=${fetchInfo.startStr}&end=${fetchInfo.endStr}`)
          .then(response => response.json())
          .then(events => successCallback(events))
          .catch(error => failureCallback(error));
      }
    });

    calendar.render();
    return () => calendar.destroy();
  }, []);

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