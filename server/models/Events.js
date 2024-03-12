const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    start: Date,
    title: String,
  });

module.exports = mongoose.model('Event', eventSchema);
