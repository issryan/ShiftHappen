const express = require('express');
const router = express.Router();
const Event = require('../models/Events'); 

// POST route to create a Event
router.post('/', async (req, res) => {
    const { employeeId, date, type, originalDate } = req.body;
    try {
        const newEvent = new Event({ employeeId, date, type, originalDate });
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT route to update a Event
router.put('/:id', async (req, res) => {
    const { date, type, originalDate } = req.body;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, { date, type, originalDate }, { new: true });
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE route to remove a Event
router.delete('/:id', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
