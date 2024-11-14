const mongoose = require('mongoose');

// Define the booking schema
const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

// Create and export the Booking model
module.exports = mongoose.model('Booking', bookingSchema);
