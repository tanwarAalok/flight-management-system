"use strict";
const { Model } = require("sequelize");
const { Enums } = require("../utils/common");
const {BUSINESS, ECONOMY, PREMIUM_ECONOMY, FIRST_CLASS } = Enums.SEATS_TYPES;
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       this.belongsTo(models.Airplane, {
         foreignKey: "airplaneId",
       });
    }
  }
  Seat.init(
    {
      airplaneId: { type: DataTypes.INTEGER, allowNull: false },
      row: { type: DataTypes.INTEGER, allowNull: false },
      col: { type: DataTypes.STRING, allowNull: false },
      seatType: {
        type: DataTypes.ENUM,
        values: [
          BUSINESS,
          ECONOMY,
          PREMIUM_ECONOMY,
          FIRST_CLASS,
        ],
        defaultValue:  ECONOMY,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Seat",
    }
  );
  return Seat;
};
