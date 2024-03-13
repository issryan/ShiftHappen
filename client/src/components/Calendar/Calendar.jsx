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
        id: event._id,
        title: event.title,
        start: event.start,
        allDay: true,
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  const updateEventInDatabase = async (eventId, newStart, newEnd) => {
    try {
      await axios.put(`http://localhost:5001/api/events/${eventId}`, {
        start: newStart,
        end: newEnd,
      });
      console.log("Event updated successfully");
    } catch (error) {
      console.error("Error updating event", error);
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
      events: events,
      editable: true,
      // delete event function
      eventClick: function (info) {
        const deleteMsg = window.confirm("Do you want to delete this event?");
        if (deleteMsg) {
          const eventId = info.event.id;
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
      },

      //update event function by drag and drop
      eventDrop: function(info) {
        const { event } = info;
        const newStart = event.start;
        const newEnd = event.end; // May be null if not a timed event
      
        // Call a function to handle the event update
        updateEventInDatabase(event.id, newStart, newEnd);
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
