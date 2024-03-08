const express = require('express');
const router = express.Router();
const Event = require('../models/Events');
const eventController = require('../controllers/eventController');

router.post('/events/generate', eventController.createEmployeeEvents);

// Endpoint to get events for a specific month and employee
router.get('/events/:employeeId/:year/:month', async (req, res) => {
  const { employeeId, year, month } = req.params;
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  try {
    const events = await Event.find({
      employeeId,
      start: {
        $gte: startDate,
        $lt: endDate
      }
    });
    res.json(events);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
