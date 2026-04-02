const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.vehicles, {
        foreignKey: 'vehicle_id',
        as: 'vehicle'   // ✅ alias
      });
    }
  }

  Booking.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      vehicle_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      total_price: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'bookings',
      timestamps: false,   // ✅ IMPORTANT FIX
    }
  );

  return Booking;
};