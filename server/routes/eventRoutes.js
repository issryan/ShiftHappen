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

// DELETE request to delete an event by ID
router.delete('/:id', async (req, res) => {
  try {
    // Use findByIdAndDelete to find the event by ID and delete it
    const event = await Event.findByIdAndDelete(req.params.id);
    
    // If no event is found, return a 404
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Return success message
    res.json({ message: "Event deleted" });
  } catch (error) {
    // Return error message if something goes wrong
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
