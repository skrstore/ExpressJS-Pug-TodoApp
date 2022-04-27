const express = require("express");
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", "./app/views");
app.set("view engine", "pug");

mongoose
  .connect(dbConfig.urlCloud, { useNewUrlParser: true })
  .then(() => console.log("DB connected"))
  .catch(err => console.log(`${err.name}\nDB not connected`));

app.use("/", express.static("app/public"));

app.get("/create", (req, res) => {
  res.render("create", { title: "Create Note" });
});

require("./app/routes/note.routes")(app);

app.listen(port, console.log(`Server running on Port ${port}!`));
