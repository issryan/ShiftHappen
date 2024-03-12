import React, { useEffect, useState, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';
import axios from 'axios';

const MyCalendar = () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch event", error);
    }
  };

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
      events,
      editable: true,
    });

    calendar.render();

    return () => calendar.destroy();
  }, [events]);

  return (
    <>
      <div className="calendar-container">
        <div className="calendar" ref={calendarRef}></div>
      </div>
    </>
  );
};

export default MyCalendar;
