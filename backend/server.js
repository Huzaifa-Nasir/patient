require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const doctorRoutes = require('./routes/doctorRoutes')
const userRoutes = require('./routes/userRoutes');


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/doctors',doctorRoutes);
app.use('/api/user',userRoutes);
// Database connection
mongoose.connect(process.env.DBURI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to MongoDB & Server running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

