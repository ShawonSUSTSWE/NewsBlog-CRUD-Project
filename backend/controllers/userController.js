"use strict";

const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const { checker } = require("../utils/validationChecker");
const dbConnection = require("../config/db_config");
const { hash } = require("bcrypt");
let hashedPassword = "";

exports.createUser = (req, res, next) => {
  checker(validationResult(req));
  const { name, email, password, dept, avatar } = req.body;
  const user = new User(name, email, password, dept, avatar);
  bcrypt.hash(user.password, 12).then((hash) => {
    hashedPassword = hash;
    console.log(user.password);
  });
  user.password = hashedPassword;
  console.log(user);
  User.createUser(user, (err, resultuser) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json({
        status: "success",
        data: resultuser,
      });
    }
  });
};

exports.getUsers = (req, res, next) => {
  User.getUsers((err, user) => {
    if (err) res.send(err);
    console.log(user);
    res.status(200).json({
      message: "Successfully fetched",
      data: user,
    });
  });
};

exports.getUser = (req, res, next) => {};

exports.logIn = (req, res, next) => {};
