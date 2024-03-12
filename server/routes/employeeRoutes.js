const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Event = require('../models/Events');


// Helper function to calculate event dates
const calculateEventDates = (availability) => {
    const today = new Date();
    const events = [];
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    daysOfWeek.forEach((day, index) => {
      if (availability[day]) {
        for (let i = 0; i < 4; i++) {
          let eventDate = new Date(today);
          eventDate.setDate(today.getDate() + ((index - today.getDay() + 7) % 7) + i * 7);
          events.push(eventDate);
        }
      }
    });
  
    return events;
  };
  
// GET request for all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST request to add a new employee
router.post('/', async (req, res) => {
    const { firstName, lastName, availability } = req.body;
    const employee = new Employee({ firstName, lastName, availability });
  
    try {
      await employee.save(); // Save the new employee
      const eventDates = calculateEventDates(availability);
  
      // Create event objects
      const events = eventDates.map(date => ({
        title: `${firstName} ${lastName}`,
        start: date,
        employeeId: employee._id,
        allDay: true
      }));
  
      // Save events to the database
      await Event.insertMany(events);
  
      res.status(201).json(employee);
    } catch (error) {
      res.status(400).json({ message: "Error adding employee and generating events", error: error.message });
    }
  });

// PUT request to update an employee
router.put('/:id', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE request to delete an employee
router.delete('/:id', async (req, res) => {
  try {
      const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
      if (!deletedEmployee) {
          return res.status(404).json({ message: 'Employee not found' });
      }
      res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

module.exports = router;
