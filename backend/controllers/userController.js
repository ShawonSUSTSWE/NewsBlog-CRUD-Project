"use strict";
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const { checker } = require("../utils/validationChecker");
const jsonwebtoken = require("jsonwebtoken");

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
        console.log(res_db);
        let token = jsonwebtoken.sign(
          {
            userID: res_db.userID,
            email: res_db.email,
            name: res_db.name,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "7d",
          }
        );
        res.status(200).json({
          message: "Signed in!!",
          token: token,
        });
      }
    }
  });
};

exports.updateUser = (req, res, next) => {
  let testPassed = true;
  const { userID } = req.userData;
  const { name, oldPassword, newPassword, dept, avatar } = req.body;
  User.findbyID(userID, (err, user) => {
    if (err) {
      res.status(404).json(err);
    } else {
      //console.log(user.password);
      if (newPassword) {
        if (bcrypt.compareSync(oldPassword, user.password)) {
          if (oldPassword === newPassword) {
            res.status(400).json({
              message: "New password should not match your old password",
            });
            testPassed = false;
          } else if (newPassword.length < 6) {
            res.status(400).json({
              message: "New password should at least be 6 character long",
            });
            testPassed = false;
          } else {
            user.password = bcrypt.hashSync(newPassword, 12);
          }
        } else {
          res.status(401).json({
            Message: "Password does not match",
          });
          testPassed = false;
        }
      }
      if (name) {
        user.name = name;
        //console.log(name);
      }
      if (dept) {
        user.dept = dept;
      }
      //console.log(avatar);
      if (avatar) {
        //console.log(avatar);
        user.avatar = avatar;
      }
    }
    //console.log(`${dept}  ${avatar}`);
    console.log(user);
  });
};
