const express = require('express');
const app = express();

const db = require('./model');

const vehicleRoutes = require('./router/vehicleRouter');
const bookingRoutes = require('./router/bookingRouter');
const { getPricing } = require('./controller/bookingController');

app.use(express.json());

app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);
app.get('/api/pricing', getPricing);

db.sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(3000, () => console.log('Server running on port 3000'));
});