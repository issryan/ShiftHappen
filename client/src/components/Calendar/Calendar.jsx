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
      const formattedEvents = response.data.map(event => ({
        id: event._id, // Assuming _id is directly accessible and correctly formatted as a string
        title: event.title,
        start: new Date(event.start), // Converts to a Date object FullCalendar can work with
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Failed to fetch events", error);
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
      eventClick: function (info) {
        const deleteMsg = window.confirm("Do you want to delete this event?");
        if (deleteMsg) {
          const eventId = info.event.id;
          // Use axios.delete to send a DELETE request
          axios.delete(`http://localhost:5001/api/events/${eventId}`)
            .then(response => {
              console.log("Event deleted:", response.data.message);
              // Remove the event from the state to update the UI
              const updatedEvents = events.filter(event => event.id !== eventId);
              setEvents(updatedEvents);
            })
            .catch(error => {
              console.error("Failed to delete event:", error);
            });
        }
      }
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
