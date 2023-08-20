"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    static associate(models) {
      this.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId',
        as: 'airplaneDetails'
      })
      this.belongsTo(models.Airport, {
        foreignKey: "departureAirportId",
        as: 'departureAirport'
      });
      this.belongsTo(models.Airport, {
        foreignKey: "arrivalAirportId",
        as: 'arrivalAirport'
      });
    }
  }
  Flight.init(
    {
      flightNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
      airplaneId: { type: DataTypes.INTEGER, allowNull: false },
      departureAirportId: { type: DataTypes.STRING, allowNull: false },
      arrivalAirportId: { type: DataTypes.STRING, allowNull: false },
      arrivalTime: { type: DataTypes.DATE, allowNull: false },
      departureTime: { type: DataTypes.DATE, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      boardingGate: { type: DataTypes.STRING},
      totalSeats: { type: DataTypes.INTEGER, allowNull: false }, // total available seats
    },
    {
      sequelize,
      modelName: "Flight",
    }
  );
  return Flight;
};
