const express = require('express');
const router = express.Router();
const StaffingRequirements = require('../models/StaffingRequirements');

// GET request to fetch staffing requirements
router.get('/', async (req, res) => {
  try {
    const requirements = await StaffingRequirements.find();
    res.json(requirements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST request to add new staffing requirements
router.post('/', async (req, res) => {
  const { day, requiredEmployees, manager } = req.body;
  const requirement = new StaffingRequirements({ day, requiredEmployees, manager });

  try {
    const newRequirement = await requirement.save();
    res.status(201).json(newRequirement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT request to update staffing requirements
router.put('/:id', async (req, res) => {
  const { requiredEmployees } = req.body;
  try {
    const requirement = await StaffingRequirements.findByIdAndUpdate(
      req.params.id,
      { requiredEmployees },
      { new: true }
    );
    if (!requirement) {
      return res.status(404).json({ message: 'Staffing requirement not found' });
    }
    res.json(requirement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;