const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    availability: {
        Monday: Boolean,
        Tuesday: Boolean,
        Wednesday: Boolean,
        Thursday: Boolean,
        Friday: Boolean,
        Saturday: Boolean,
    },
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
