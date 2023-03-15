const express = require("express");

const port = process.env.PORT || 4000;

const app = express();

app.use("/", (req, res) => {
  res.send("hello there");
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
