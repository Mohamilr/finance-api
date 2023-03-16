const dotenv = require("dotenv");

dotenv.config();
const config = {
  DATABASE_URL: process.env.DATABASE_URL,
};

module.exports = config;
