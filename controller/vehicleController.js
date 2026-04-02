const vehicleService = require('../services/vehicleService');

exports.getAvailableVehicles = async (req, res) => {
  try {
    const { start, end } = req.query;
    const vehicles = await vehicleService.getAvailableVehicles(start, end);
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addVehicle = async (req, res) => {
  try {
    const vehicle = await vehicleService.createVehicle(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};