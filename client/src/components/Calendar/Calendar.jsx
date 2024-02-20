import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import './Calendar.css'

const MyCalendar = () => {
  // create references for calendar and external events
  const calendarRef = useRef(null);
  const externalEventsRef = useRef(null);
  

  // create references for checkbox and modal state
  const checkboxRef = useRef(null);

  // create state for external events
  const [externalEvents] = useState([]);

  useEffect(() => {
    // get references for calendar, external events, and checkbox
    const calendarEl = calendarRef.current;
    const externalEventsEl = externalEventsRef.current;
    const checkbox = checkboxRef.current;

    // create draggable object for external events
    const draggable = new Draggable(externalEventsEl, {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
        return {
          title: eventEl.innerText
        };
      }
    });

    // create calendar object with plugins and settings
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

    // render the calendar
    calendar.render();

    // return a cleanup function to destroy the calendar and draggable objects
    return () => {
      calendar.destroy();
      draggable.destroy();
    };
    
  }, [externalEvents]);
  

  return (
    <>

      {/* Display Container */}

      <div className="calendar-container">

        {/* container for external events */}
        <div className="external-events-container" ref={externalEventsRef}>
          <div className="external-events-header">Employee List</div>
          {externalEvents.map(event => (
            <div key={event.id} className="fc-event">{event.title}</div>
          ))}
        </div>

        {/* container for calendar */}
        <div className="calendar" ref={calendarRef}></div>
      </div>
    </>
  );
};

export default MyCalendar;
