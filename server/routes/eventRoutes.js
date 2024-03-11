const router = require('express').Router();
const Event = require('../models/Events');
const Employee = require('../models/Employee');
const moment = require('moment');

//function to generate events per employees availability
function generateEventsForEmployee(employee) {
  const today = new Date();
  const events = [];
  for (let i = 0; i < 4 * 7; i++) { // Loop through 4 weeks
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    const dayOfWeek = date.toLocaleString('en-us', { weekday: 'long' }).toLowerCase();
    
    if (employee.availability[dayOfWeek]) {
      events.push({
        employee: employee._id,
        date: date,
        title: `${employee.firstName}'s Availability`,
      });
    }
  }
  return events;
}


router.post('/api/generate-events/:employeeId', async (req, res) => {
  const { employeeId } = req.params;
  const employee = await Employee.findById(employeeId);
  if (!employee) {
    return res.status(404).send('Employee not found');
  }

  const events = generateEventsForEmployee(employee);
  await Event.insertMany(events); // Save generated events to the database
  res.send(events);
});

router.get('/api/events', async (req, res) => {
  const { start, end } = req.query;
  const events = await Event.find({
    date: { $gte: new Date(start), $lte: new Date(end) },
  }).populate('employee');
  res.send(events.map(event => ({
    title: event.title,
    start: event.date,
    allDay: true,
  })));
});


module.exports = router;