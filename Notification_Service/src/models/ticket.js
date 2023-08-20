'use strict';
const {
  Model
} = require('sequelize');
const { ENUM } = require("../utils/common");
const {PENDING, SUCCESS, FAILED } = ENUM.TICKET_STATUS_ENUMS;
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ticket.init({
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recepientEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: [PENDING, SUCCESS, FAILED],
      defaultValue: PENDING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};