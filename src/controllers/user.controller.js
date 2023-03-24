const User = require("../models/users.model");
const {
  jsonResponse,
  generateAccountNumber,
  generateToken,
} = require("../helpers");

class UserController {
  async createUser(req, res) {
    const { email, password } = req.body;

    await User.create({
      email,
      password,
      account_number: generateAccountNumber(),
    });

    return jsonResponse(res, "success", 201, "User created successfully");
  }

  async login(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ email });

    const token = generateToken({ email, id: user._id });

    return jsonResponse(res, "success", 201, "User login successful", {
      token,
    });
  }
}

module.exports = UserController;
