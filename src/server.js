const express = require("express");
const http = require("http");
const userRouter = require("./routes/user.route");
const transactionRouter = require("./routes/transaction.route");
const { jsonResponse } = require("./helpers");
require("dotenv").config();
require("./database/database");

const port = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);

app.use(express.json({ extented: false }));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/api/v1", userRouter);
app.use("/api/v1", transactionRouter);

app.use("*", (req, res) => {
  jsonResponse(res, "error", 404, "Route does not exist");
});

server.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
