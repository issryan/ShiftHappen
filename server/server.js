require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes'); 
const eventRoutes = require('./routes/eventRoutes'); 


const app = express();

app.use(cors());
app.use(express.json());

//ROUTES
app.use('/api/employees', employeeRoutes);
app.use('/api/events', eventRoutes); 


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


