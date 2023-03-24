const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const db = require("./database/database");
const userRouter = require("./routes/user.route");
const transactionRouter = require("./routes/transaction.route");

dotenv.config();

const port = process.env.PORT || 9000;

const app = express();
const server = http.createServer(app);

app.use(express.json({ extented: false }));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/v1", userRouter);
app.use("/api/v1", transactionRouter);

// app.use("/api/v1", (req, res) => {
//   res.send("hello there");
// });

server.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
