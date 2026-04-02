const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Vehicle extends Model {
    static associate(models) {
      Vehicle.hasMany(models.bookings, {
        foreignKey: 'vehicle_id',
        as: 'bookings'   // ✅ alias
      });
    }
  }

  Vehicle.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
      },
      price_per_day: {
        type: DataTypes.INTEGER,
        defaultValue: 1000,
      },
    },
    {
      sequelize,
      modelName: 'vehicles',
      timestamps: false,   // ✅ IMPORTANT FIX
    }
  );

  return Vehicle;
};