const { Op } = require('sequelize');
const db = require('../models');

const Vehicle = db.vehicles;
const Booking = db.bookings;
const { calculatePrice } = require('../utils/pricing');

const createBooking = async (data) => {
    const { vehicle_id, customer_name, start_date, end_date } = data;

    // 1. Check conflict
    const conflict = await Booking.findOne({
        where: {
            vehicle_id,
            [Op.and]: [
                { start_date: { [Op.lt]: end_date } },
                { end_date: { [Op.gt]: start_date } }
            ]
        }
    });

    if (conflict) {
        throw new Error("Vehicle already booked for selected dates");
    }

    // 2. Calculate days
    const start = new Date(start_date);
    const end = new Date(end_date);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (days <= 0) {
        throw new Error("Invalid date range");
    }

    // 3. Pricing
    const total_price = calculatePrice(days);

    // 4. Create booking
    return await Booking.create({
        vehicle_id,
        customer_name,
        start_date,
        end_date,
        total_price
    });
};

module.exports = { createBooking };