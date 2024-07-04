const mongoose = require('mongoose');

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
        Sunday: Boolean 
    },
    status: { 
        type: String,
        enum: ['available', 'vacation', 'unavailable'],
        default: 'available'
    }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
