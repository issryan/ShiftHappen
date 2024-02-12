import React, { useState } from 'react';
import './Employee.css'

function EmployeeModal({ isOpen, onClose, onSubmit }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [availability, setAvailability] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });

  if (!isOpen) {
    return null;
  }

  const handleCheckboxChange = (event) => {
    setAvailability({
      ...availability,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ firstName, lastName, availability });
    onClose();
  };

  return (
    <div className="modal-portal">
      <form onSubmit={handleSubmit} className="modal-form">
        <input
          type="text"
          placeholder="First Name"
          className="modal-input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          className="modal-input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <div className="weekDays-selector">
          {Object.keys(availability).map((day) => (
            <div key={day}>
              <input
                type="checkbox"
                id={day}
                name={day}
                checked={availability[day]}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={day}>{day.slice(0, 3)}</label> {/* Display abbreviated day names */}
            </div>
          ))}
        </div>
        <button type="submit" className="modal-button">Add Employee</button>
        <button type="button" onClick={onClose} className="modal-button" style={{ backgroundColor: '#6c757d' }}>Cancel</button>
      </form>
    </div>
  );
}

export default EmployeeModal;
