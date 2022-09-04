const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { msg: "<h2>This is a Message.</h2>" });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
