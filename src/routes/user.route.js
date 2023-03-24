const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const AuthMiddleWare = require("../middleware/auth.middleware");

const userRouter = Router();
const userController = new UserController();
const authMiddleWare = new AuthMiddleWare();

userRouter.post(
  "/auth/create-user",
  authMiddleWare.createUser,
  userController.createUser
);
userRouter.post("/auth/login", authMiddleWare.login, userController.login);

module.exports = userRouter;
