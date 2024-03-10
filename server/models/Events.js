const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    start: Date,
    end: Date,
    title: String
});

module.exports = mongoose.model('Event', eventSchema);
