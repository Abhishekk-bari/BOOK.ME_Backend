app.get('/api/available-dates', async (req, res) => {
    try {
        const bookings = await Booking.find({});
        const bookedDates = bookings.map(booking => booking.date.toISOString().split('T')[0]);
        res.json(bookedDates); // Send booked dates to frontend
    } catch (error) {
        res.status(500).send('Error fetching available dates');
    }
});
