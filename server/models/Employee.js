const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  availability: { type: Map, of: Boolean },
});

module.exports = mongoose.model('Employee', employeeSchema);
