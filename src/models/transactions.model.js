const mongoose = require("mongoose");
const { Schema } = mongoose;
const { transactionEnum } = require("../enum/transaction.enum");

const { SAVINGS, TRANSFER } = transactionEnum;

const transactionsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  email: {
    type: String,
    required: true,
  },
  transaction_type: {
    type: String,
    enum: [SAVINGS, TRANSFER],
    required: true,
  },
  transaction_ref: String,
  receiver_account: Number,
  sender_account: Number,
  amount: {
    type: Number,
    default: 0,
  },
});

const Transaction = (module.exports = mongoose.model(
  "Transactions",
  transactionsSchema
));

module.exports = Transaction;
