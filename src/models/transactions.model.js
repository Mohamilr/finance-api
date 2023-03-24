const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  email: {
    type: String,
    required: true,
  },
  transaction_type: {
    type: String,
    enum: ["savings", "transfer"],
    required: true,
  },
  transaction_ref: String,
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
