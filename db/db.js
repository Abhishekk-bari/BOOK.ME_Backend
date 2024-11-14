require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB URI (local or MongoDB Atlas)
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/photography';

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);  // Exit the process with failure
    }
};

module.exports = connectDB;
