const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee'); // Assuming your model file is Employee.js

// POST route to add a new employee
router.post('/', async (req, res) => {
  const { firstName, lastName, availability } = req.body;
  try {
    const newEmployee = new Employee({ firstName, lastName, availability });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route to fetch all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT route to update an employee's details
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, availability } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, { firstName, lastName, availability }, { new: true });
    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE route to remove an employee
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
