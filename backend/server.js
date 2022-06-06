"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/api/v1/", routes);

app.get("/", (req, res) => {
  res.send("Welcome to Daily SUST News Blog!!!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
