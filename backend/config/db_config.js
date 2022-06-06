"use strict";

const mysql = require("mysql");

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "newsblog_crud",
});

dbConnection.connect((err) => {
  if (err) {
    //console.log("ERROR!!!");
    throw err;
  }
  console.log("Database Connected");
});

module.exports = dbConnection;
