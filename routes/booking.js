const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST route for creating a new booking
router.post('/book', async (req, res) => {
    const { name, email, message, date } = req.body;

    // Validate the required fields
    if (!name || !email || !message || !date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Create a new booking instance
        const newBooking = new Booking({
            name,
            email,
            message,
            date
        });

        // Save the booking to the database
        await newBooking.save();

        // Respond with a success message
        res.status(201).json({ message: 'Booking confirmed! We will contact you shortly.' });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ error: 'There was an error saving the booking.' });
    }
});

module.exports = router;
