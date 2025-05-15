import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({
    path: '.env'
});

import { MONGODB_URI, PORT } from './config/config';

// Import routes
import apiRoutes from './routes/api';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
(async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }

})()

// Use routes
app.use('/api/v1/auth', apiRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});