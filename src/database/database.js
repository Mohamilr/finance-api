const mongoose = require("mongoose");
const { DATABASE_URL } = require("../config/config");

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connected");
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

module.exports = new Database();
