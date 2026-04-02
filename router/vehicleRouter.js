const express = require('express');
const router = express.Router();

const { getAvailableVehicles, addVehicle } = require('../controller/vehicleController');

router.get('/available', getAvailableVehicles);
router.post('/', addVehicle);

module.exports = router;