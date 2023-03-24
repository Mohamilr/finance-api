const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
require("dotenv").config();

const jsonResponse = (res, status, code, message, data) => {
  res.status(code).json({
    status,
    message,
    data,
  });
};

const generateAccountNumber = (length = 10) => {
  let result = "";
  let characters = "01234567898976543210";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const generateTransactionRef = () => {
  return uuid();
};

const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  jsonResponse,
  generateAccountNumber,
  generateTransactionRef,
  generateToken,
  verifyToken,
};
