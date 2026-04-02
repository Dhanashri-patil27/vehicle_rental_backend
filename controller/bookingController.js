const bookingService = require('../services/bookingService');
const { calculatePrice } = require('../utils/pricing');

exports.createBooking = async (req, res) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPricing = (req, res) => {
  const { start, end } = req.query;

  const days = Math.ceil(
    (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)
  );

  const price = calculatePrice(days);

  res.json({ days, price });
};