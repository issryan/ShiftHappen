const mongoose = require('mongoose');

const StaffingRequirementsSchema = new mongoose.Schema({
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true
    },
    requiredEmployees: {
        type: Number,
        required: true
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const StaffingRequirements = mongoose.model('StaffingRequirements', StaffingRequirementsSchema);

module.exports = StaffingRequirements;