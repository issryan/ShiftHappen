require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
const eventRoutes = require('./routes/eventRoutes');
const staffingRequirementsRoutes = require('./routes/staffingRequirementsRoutes'); 
const authRoutes = require('./routes/auth/authRoutes'); 

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/employees', employeeRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/staffing-requirements', staffingRequirementsRoutes); 
app.use('/api/auth', authRoutes); 

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => console.log(err));