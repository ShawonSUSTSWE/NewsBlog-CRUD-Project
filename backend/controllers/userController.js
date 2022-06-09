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

exports.getUser = (req, res, next) => {
  User.findbyID(req.params.uuid, (err, user) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(user);
    }
  });
};

exports.logIn = (req, res, next) => {
  checker(validationResult(req));
  const { email, password } = req.body;
  User.searchForEmail(email, password, (err, res_db) => {
    if (err) {
      res.status(400).json({
        Error: "Bad Request",
      });
    }
    if (!res_db) {
      res.status(401).json({
        success: 0,
        data: "Invalid email or password",
      });
    } else {
      if (!bcrypt.compareSync(password, res_db.password)) {
        res.status(401).json({
          success: 0,
          data: "Invalid email or password",
        });
      } else {
        res.status(200).json({
          message: "Signed in!!",
        });
      }
    }
  });
};
