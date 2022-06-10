"use strict";

const News = require("../models/newsModels");
const { validationResult } = require("express-validator");
const { checker } = require("../utils/validationChecker");

exports.publishNews = (req, res, next) => {
  checker(validationResult(req));
  const { title, category, content, image } = req.body;
  const user = req.userData;
  console.log(user);
  const news = new News(title, category, content, image, user.uuid);
  News.publishNews(news, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json({
        status: "success",
        data: result,
      });
    }
  });
};

exports.getAllNews = (req, res, next) => {
  News.getAllNews((err, response) => {
    if (err) res.send(err);
    console.log(response);
    res.status(200).json({
      message: "Successfully fetched",
      data: response,
    });
  });
};

exports.getNewsbyUser = (req, res, next) => {
  News.getNewsbyUser(req.params.uuid, (err, response) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(response);
    }
  });
};

exports.deleteNews = (req, res, next) => {};
exports.updateNews = (req, res, next) => {};
