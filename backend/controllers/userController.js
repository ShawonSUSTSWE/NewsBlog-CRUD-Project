"use strict";

const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const { checker } = require("../utils/validationChecker");
const dbConnection = require("../config/db_config");

exports.createUser = (req, res, next) => {
  checker(validationResult(req));
  const { name, email, password, dept, avatar } = req.body;
  const user = new User(name, email, password, dept, avatar);
  const hashedPassword = bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
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
    console.log("controller");
    if (err) res.send(err);
    console.log("res", user);
    res.status(200).json({
      data: user,
    });
  });
};

exports.getUser = (req, res, next) => {};

exports.logIn = (req, res, next) => {};
