const User = require("../models/users.model");
const { jsonResponse, verifyToken } = require("../helpers");
const bcrypt = require("bcrypt");

class AuthMiddleWare {
  async createUser(req, res, next) {
    const { email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
      return jsonResponse(res, "error", 400, "passwords must match");
    }

    const user = await User.findOne({ email });

    if (user) {
      return jsonResponse(res, "error", 400, "User already exist");
    }

    next();
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return jsonResponse(res, "error", 401, "User does not exist");
    }

    const valid = await bcrypt.compare(password, user?.password);

    if (!valid) {
      return jsonResponse(res, "error", 401, "Incorrect credentials");
    }

    next();
  }

  async verifyUserToken(req, res, next) {
    try {
      const headers = req.headers["authorization"];

      const token = headers.split(" ")[1];

      const decoded = verifyToken(token);

      const user = await User.findOne({ _id: decoded.id });

      if (!user) {
        return jsonResponse(res, "error", 401, "User does not exist");
      }

      req.userId = decoded.id;

      next();
    } catch (err) {
      return jsonResponse(res, "error", 403, "Forbidden request");
    }
  }
}

module.exports = AuthMiddleWare;
