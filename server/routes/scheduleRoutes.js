const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule'); 

// POST route to create a schedule
router.post('/', async (req, res) => {
    const { employeeId, date, type, originalDate } = req.body;
    try {
        const newSchedule = new Schedule({ employeeId, date, type, originalDate });
        const savedSchedule = await newSchedule.save();
        res.status(201).json(savedSchedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT route to update a schedule
router.put('/:id', async (req, res) => {
    const { date, type, originalDate } = req.body;
    try {
        const updatedSchedule = await Schedule.findByIdAndUpdate(req.params.id, { date, type, originalDate }, { new: true });
        res.json(updatedSchedule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE route to remove a schedule
router.delete('/:id', async (req, res) => {
    try {
        await Schedule.findByIdAndDelete(req.params.id);
        res.json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
