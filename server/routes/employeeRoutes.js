const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Event = require('../models/Events');
const StaffingRequirements = require('../models/StaffingRequirements');

// Helper function to calculate event dates
const calculateEventDates = (availability, months) => {
  const today = new Date();
  const events = [];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weeks = months * 4; // Approximate 4 weeks per month

  daysOfWeek.forEach((day, index) => {
    if (availability[day]) {
      for (let i = 0; i < weeks; i++) {
        let eventDate = new Date(today);
        eventDate.setDate(today.getDate() + ((index - today.getDay() + 7) % 7) + i * 7);
        events.push(eventDate);
      }
    }
  });

  return events;
};

// Function to generate schedule based on availability and staffing requirements
const generateSchedule = async (months) => {
  const employees = await Employee.find();
  const requirements = await StaffingRequirements.find();
  const schedule = [];

  requirements.forEach(requirement => {
    const availableEmployees = employees.filter(employee => employee.availability[requirement.day] && employee.status === 'available');
    const eventDates = calculateEventDates({ [requirement.day]: true }, months);

    eventDates.forEach(date => {
      if (availableEmployees.length < requirement.requiredEmployees) {
        schedule.push({
          day: requirement.day,
          date,
          status: 'understaffed',
          required: requirement.requiredEmployees,
          available: availableEmployees.length
        });
      } else if (availableEmployees.length > requirement.requiredEmployees) {
        schedule.push({
          day: requirement.day,
          date,
          status: 'overstaffed',
          required: requirement.requiredEmployees,
          available: availableEmployees.length
        });
      } else {
        schedule.push({
          day: requirement.day,
          date,
          status: 'adequate',
          required: requirement.requiredEmployees,
          available: availableEmployees.length
        });
      }
    });
  });

  return schedule;
};

// Route to generate schedule
router.post('/generate-schedule', async (req, res) => {
  const { months } = req.body;

  if (!months || months < 1) {
    return res.status(400).json({ message: 'Invalid number of months' });
  }

  try {
    const schedule = await generateSchedule(months);
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Compare availabilities to determine changes
const compareAvailabilities = (oldAvailability, newAvailability) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let addedDays = [];
  let removedDays = [];

  daysOfWeek.forEach(day => {
    const isOldAvailable = oldAvailability[day];
    const isNewAvailable = newAvailability[day];

    if (isNewAvailable && !isOldAvailable) {
      addedDays.push(day);
    } else if (!isNewAvailable && isOldAvailable) {
      removedDays.push(day);
    }
  });

  return { addedDays, removedDays };
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
    const eventDates = calculateEventDates(availability, 1); // Default to 1 month

    // Create event objects
    const events = eventDates.map(date => ({
      title: `${firstName} ${lastName}`,
      start: date,
      employee: employee._id,
      allDay: true
    }));

    // Save events to the database
    await Event.insertMany(events);

    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: "Error adding employee and generating events", error: error.message });
  }
});

// PUT request to update an employee and their equivalent events
router.put('/:id', async (req, res) => {
  const { availability } = req.body;
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Compare old and new availabilities to determine changes
    const { addedDays, removedDays } = compareAvailabilities(employee.availability, availability);

    // Handle removed days and delete events on those days
    for (const day of removedDays) {
      await Event.deleteMany({
        employee: employee._id,
      });
    }

    // Before handling added days, fetch existing events to avoid duplications
    const existingEvents = await Event.find({ employee: employee._id });
    const existingEventDates = existingEvents.map(event => event.start.toISOString().split('T')[0]);

    // Handle added days and create new events for these days if they don't already exist
    const newEventDates = calculateEventDates(availability, 1).filter(date => { // Default to 1 month
      const isoDate = date.toISOString().split('T')[0];
      return !existingEventDates.includes(isoDate); // Filter out dates that already have events
    });

    const newEvents = newEventDates.map(date => ({
      title: `${employee.firstName} ${employee.lastName}`,
      start: date,
      employee: employee._id,
      allDay: true,
    }));

    if (newEvents.length > 0) {
      await Event.insertMany(newEvents);
    }

    // Update the employee with new availability and other fields
    employee.availability = availability; 
    await employee.save(); 
    res.json(employee); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE request to delete an employee
router.delete('/:id', async (req, res) => {
  try {
    const employeeId = req.params.id;
    console.log("Deleting events for employeeId:", employeeId);

    // First, delete all events associated with this employee
    await Event.deleteMany({ employee: employeeId });

    // Then, delete the employee
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee and associated events deleted successfully' });
  } catch (error) {
    (res.status500).json({ message: error.message });
  }
});

module.exports = router;