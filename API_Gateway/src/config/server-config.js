const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  BOOKING_SERVICE_URL: process.env.BOOKING_SERVICE_URL,
  FLIGHT_SERVICE_URL: process.env.FLIGHT_SERVICE_URL,
};