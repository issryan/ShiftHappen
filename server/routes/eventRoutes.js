const express = require('express');
const router = express.Router();
const Event = require('../models/Events');

// GET request to fetch events
router.get('/', async (req, res) => {
  try {
      const events = await Event.find();
      res.json(events);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

module.exports = router;
