import React, {useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';

const MyCalendar = () => {
  const calendarRef = useRef(null);
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
      events: '/api/events/employeeMongoId/2024/3'
    });

    calendar.render();

    return () => calendar.destroy();
  }, []);

  return (
    <>
      <div className="calendar-container">
        <div className="calendar" ref={calendarRef}></div>
      </div>
    </>
  );
};

export default MyCalendar;
