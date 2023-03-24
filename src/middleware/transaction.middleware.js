const User = require("../models/users.model");
const { jsonResponse } = require("../helpers");

class TransactionMiddleWare {
  async sendMoney(req, res, next) {
    const { account_number } = req.body;

    const receiver = await User.findOne({ account_number });

    if (!receiver) {
      return jsonResponse(res, "error", 404, "Receiver does not exist");
    }

    next();
  }
}

module.exports = TransactionMiddleWare;
