const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { ServerConfig } = require("../../config");

function checkPassword(plainPassword, encryptedPassword) {
  try {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
  } catch (error) {
    throw error;
  }
}

function createToken(input) {
    try {
        return jwt.sign(input, ServerConfig.JWT_SECRET, {expiresIn: ServerConfig.JWT_EXPIRE })
    } catch (error) {
        throw error;
    }
}

function verifyToken(token) {
    try {
        return jwt.verify(token, ServerConfig.JWT_SECRET);
    } catch (error) {
        throw error;
    }
}

module.exports = {
  checkPassword,
  createToken,
  verifyToken,
};
