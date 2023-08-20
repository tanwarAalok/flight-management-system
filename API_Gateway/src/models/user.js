'use strict';
const {
  Model
} = require('sequelize');
const becrypt = require("bcrypt");
const { ServerConfig } = require('../config');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Role, { through: 'User_Roles', as: 'role' });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 20],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(function encrypt(user) {
    const encryptedPassword = becrypt.hashSync(user.password, +ServerConfig.SALT_ROUNDS); 
    user.password = encryptedPassword;
  })

  return User;
};