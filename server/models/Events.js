const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    date: { type: Date, required: true },
    type: { type: String, enum: ['scheduled', 'day_off', 'rescheduled'], required: true },
    originalDate: { type: Date }, //only for rescheduled shifts
});

const Event = mongoose.model('Event', EventSchema);