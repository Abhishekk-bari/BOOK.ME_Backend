const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const connectDB = require('./db/db');  // Import the MongoDB connection
const bookingRoutes = require('./routes/booking');  // Import the booking routes


// Set up the Express app
const app = express();
app.use(bodyParser.json());

// Enable CORS for frontend origin
app.use(cors({ origin: 'http://localhost:5173' }));

// Connect to MongoDB
connectDB();

// Prevent the OverwriteModelError by checking if the model already exists
const Booking = mongoose.models.Booking || mongoose.model('Booking', {
    name: String,
    email: String,
    message: String,
    date: Date
});


app.post('/api/bookings', async (req, res) => {
    try {
        const { name, email, message, date } = req.body;

        // Normalize the incoming date to ignore the time part
        const bookingDate = new Date(date);
        bookingDate.setHours(0, 0, 0, 0);  // Set time to midnight (00:00:00)

        // Log the incoming date and normalized date for debugging
        console.log('Incoming date:', date);
        console.log('Normalized booking date:', bookingDate);

        // Check if the date is already booked (ignoring time part)
        const existingBooking = await Booking.findOne({
            date: {
                $gte: bookingDate, // Match any booking on or after the given date
                $lt: new Date(bookingDate.getTime() + 24 * 60 * 60 * 1000) // Match any booking before the next day
            }
        });

        console.log('Existing booking:', existingBooking); // Log the existing booking for debugging

        if (existingBooking) {
            return res.status(400).send('This date is already booked.');
        }

        // Save the booking to MongoDB
        const booking = new Booking({ name, email, message, date });
        await booking.save();

        res.status(200).send('Booking confirmed.');
    } catch (error) {
        console.error('Error occurred:', error); // Log the error for debugging
        res.status(500).send(`Server error: ${error.message || error}`);
    }
});



// Start the server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
