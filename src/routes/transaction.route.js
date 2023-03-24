const { Router } = require("express");
const TransactionController = require("../controllers/transaction.controller");
const AuthMiddleWare = require("../middleware/auth.middleware");
const TransactionMiddleWare = require("../middleware/transaction.middleware");

const transactionRouter = Router();
const transactionController = new TransactionController();
const authMiddleWare = new AuthMiddleWare();
const transactionMiddleWare = new TransactionMiddleWare();

transactionRouter.post(
  "/transaction/save-money",
  authMiddleWare.verifyUserToken,
  transactionController.saveMoney
);
transactionRouter.post(
  "/transaction/send-money",
  authMiddleWare.verifyUserToken,
  transactionMiddleWare.sendMoney,
  transactionController.sendMoney
);
transactionRouter.get(
  "/transaction/transactions",
  authMiddleWare.verifyUserToken,
  transactionController.getAllTransactions
);
transactionRouter.get(
  "/transaction/account-balance",
  authMiddleWare.verifyUserToken,
  transactionController.getAccountBalance
);

module.exports = transactionRouter;
