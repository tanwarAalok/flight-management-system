const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  SMPT_MAIL: process.env.SMPT_MAIL,
  SMPT_PASSWORD: process.env.SMPT_PASSWORD,
};