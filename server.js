const express = require("express");
const mongoose = require("mongoose");
const app = express();

const dbURL = "mongodb://localhost:27017/monday";

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch(err => {
    console.log("Error in DB connection", err.name);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./app/views");
app.set("view engine", "pug");

app.use(express.static("./app/public"));

app.use('/', require('./app/routes/user.routes'))

app.listen(3000, console.log(`Serving on 3000`));
