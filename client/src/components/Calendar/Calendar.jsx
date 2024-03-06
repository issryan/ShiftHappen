import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';
import { fetchSchedulesFromDatabase } from './scheduleManager'; 
const MyCalendar = () => {
  const calendarRef = useRef(null);
  const [schedules, setSchedules] = useState([]); // State to hold fetched schedules
 
  useEffect(() => {
    // Fetch schedules when the component mounts
    const fetchAndSetSchedules = async () => {
        const fetchedSchedules = await fetchSchedulesFromDatabase();
        setSchedules(fetchedSchedules);
    };

    fetchAndSetSchedules();
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
      events: schedules,
    });

    calendar.render();

    return () => calendar.destroy();
  }, [schedules]); // Removed the dependency on externalEvents since it's no longer used

  return (
    <>
      <div className="calendar-container">
        <div className="calendar" ref={calendarRef}></div>
      </div>
    </>
  );
};

export default MyCalendar;
