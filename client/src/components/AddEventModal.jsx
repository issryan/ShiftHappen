import Modal from "react-modal";
import React, { useState } from "react";
import "./Calendar.css";

// Define the AddEventModal component
export default function AddEventModal({ isOpen, onClose, onEventAdded }) {
  // Define the title and daysOfWeek state using the useState hook
  const [title, setTitle] = useState("");
  const [daysOfWeek, setDaysOfWeek] = useState([]);

  // Define the onSubmit handler
  const onSubmit = (event) => {
    event.preventDefault();
    const newEvent = { title, daysOfWeek };
    // Call the onEventAdded callback with the new event object
    onEventAdded(newEvent);
    // Reset the title and daysOfWeek state and close the modal
    setTitle("");
    setDaysOfWeek([]);
    onClose();
  };

  // Render the modal component
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} portalClassName="modal-portal">
      {/* Render a form with a title input, a days of week checkbox group, and a submit button */}
      <form onSubmit={onSubmit} className="modal-form">
        <input
          placeholder="Employee Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="modal-input"
        />
        <div className="weekDays-selector">
          <span>Select Employee Availability: </span> <br /><br />
          {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
            <React.Fragment key={day}>
              <input
                type="checkbox"
                id={`weekday-${day}`}
                className="weekday"
                value={day}
              />
              <label htmlFor={`weekday-${day}`}>{day}</label>
            </React.Fragment>
          ))}
        </div>

        <button type="submit" className="modal-button">
          Add Employee
        </button>
      </form>
    </Modal>
  );
}
