const express = require("express");
const rookout = require("rookout");
require("dotenv").config();

const app = express();
const NODE_ENV = process.env.NODE_ENV || "dev";
const PORT = process.env.PORT || 8080;
const ROOKOUT_TOKEN = process.env.ROOKOUT_TOKEN || "";

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { msg: "<h2>This is a Message.</h2>" });
});

app.get("/api/data", (req, res) => {
  const tech = ["Angular", "NodeJS", "ExpressJS", "MongoDB"];
  res.json({
    data: { tech },
    status: "success",
  });
});

rookout
  .start({
    token: ROOKOUT_TOKEN,
    labels: { env: "dev" },
  })
  .then(() => {
    console.log("[Rookout] Connected");
  })
  .catch(() => {
    console.log("[Rookout] Error");
  });

app.listen(PORT, () => {
  console.log(`[app] Environment : ${NODE_ENV}`);
  console.log(`[app] Port : ${PORT}`);
});
