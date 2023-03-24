const { Router } = require("express");
const TransactionController = require("../controllers/transaction.controller");
const AuthMiddleWare = require("../middleware/auth.middleware");

const transactionRouter = Router();
const transactionController = new TransactionController();
const authMiddleWare = new AuthMiddleWare();

transactionRouter.post(
  "/transaction/save-money",
  authMiddleWare.verifyUserToken,
  transactionController.saveMoney
);
transactionRouter.post(
  "/transaction/send-money",
  authMiddleWare.verifyUserToken,
  transactionController.sendMoney
);
transactionRouter.get(
  "/transaction/transactions",
  authMiddleWare.verifyUserToken,
  transactionController.getAllTransactions
);
transactionRouter.get(
  "/transaction/:account-number",
  authMiddleWare.verifyUserToken,
  transactionController.getAccountBalance
);

module.exports = transactionRouter;
