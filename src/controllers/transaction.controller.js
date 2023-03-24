const Transaction = require("../models/transactions.model");
const User = require("../models/users.model");
const { jsonResponse, generateTransactionRef } = require("../helpers");
const { transactionEnum } = require("../enum/transaction.enum");

const { SAVINGS, TRANSFER } = transactionEnum;

class TransactionController {
  async saveMoney(req, res) {
    const userId = req.userId;
    const { amount } = req.body;

    const updatedData = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { balance: amount } },
      { new: true }
    ).select("-password");

    await Transaction.create({
      userId,
      email: updatedData.email,
      transaction_type: SAVINGS,
      transaction_ref: generateTransactionRef(),
      amount,
    });

    return jsonResponse(
      res,
      "success",
      201,
      "Account top up successful",
      updatedData
    );
  }

  async sendMoney(req, res) {
    const userId = req.userId;
    const { account_number, amount } = req.body;

    const sender = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { balance: -amount } }
    );
    const receiver = await User.findOneAndUpdate(
      { account_number },
      { $inc: { balance: amount } }
    );

    const transferRef = generateTransactionRef();

    const senderTransaction = await Transaction.create({
      userId,
      email: sender.email,
      transaction_type: TRANSFER,
      transaction_ref: transferRef,
      receiver_account: account_number,
      amount,
    });

    // RCEIVER TRANSACTION ENTRY
    await Transaction.create({
      userId: receiver._id,
      email: receiver.email,
      transaction_type: TRANSFER,
      transaction_ref: transferRef,
      sender_account: sender.account_number,
      amount,
    });

    return jsonResponse(
      res,
      "success",
      201,
      "Transfer successful",
      senderTransaction
    );
  }

  async getAllTransactions(req, res) {
    const userId = req.userId;

    const userTransactions = await Transaction.find({ userId });

    return jsonResponse(
      res,
      "success",
      200,
      "User transactions fetched successfully",
      userTransactions
    );
  }

  async getAccountBalance(req, res) {
    const userId = req.userId;

    const userBalance = await User.findOne({ _id: userId }).select("balance");

    return jsonResponse(res, "success", 200, "", userBalance);
  }
}

module.exports = TransactionController;
