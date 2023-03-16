const express = require("express");
const dotenv = require("dotenv");
const db = require("./database/database");

dotenv.config();

const port = process.env.PORT || 2000;

const app = express();
app.use(express.json({ extented: false }));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", (req, res) => {
  res.send("hello there");
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
