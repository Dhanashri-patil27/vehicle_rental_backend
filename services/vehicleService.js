const { Op } = require('sequelize');
const db = require('../models');

const Vehicle = db.vehicles;
const Booking = db.bookings;

const getAvailableVehicles = async (start, end) => {
  const vehicles = await Vehicle.findAll({
    include: [
  {
    model: Booking,
    as: 'bookings',   // ✅ ADD THIS
    required: false,
    where: {
      [Op.and]: [
        { start_date: { [Op.lt]: end } },
        { end_date: { [Op.gt]: start } }
      ]
    }
  }
]
  });

  return vehicles.filter(v => !v.bookings || v.bookings.length === 0);
};

const createVehicle = async (data) => {
  return await Vehicle.create(data);
};

module.exports = { getAvailableVehicles, createVehicle };