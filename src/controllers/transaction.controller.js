const Transaction = require("../models/transactions.model");
const User = require("../models/users.model");
const { jsonResponse } = require("../helpers");

class TransactionController {
  async saveMoney(req, res) {
    const userId = req.userId;

    return jsonResponse(res, "success", 201, "User created successfully");
  }

  async sendMoney(req, res) {
    return jsonResponse(res, "success", 201, "User login successful");
  }

  async getAllTransactions(req, res) {
    return jsonResponse(res, "success", 200, "User created successfully");
  }

  async getAccountBalance(req, res) {
    return jsonResponse(res, "success", 200, "User login successful");
  }
}

module.exports = TransactionController;
