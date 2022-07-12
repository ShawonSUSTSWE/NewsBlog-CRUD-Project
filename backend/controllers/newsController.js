"use strict";

const News = require("../models/newsModels");
const { validationResult } = require("express-validator");
const { checker } = require("../utils/validationChecker");

exports.publishNews = (req, res, next) => {
  checker(validationResult(req));
  const { title, category, content, image } = req.body;
  const user = req.userData;
  console.log(user.userID);
  const news = new News(title, category, content, image, user.userID);
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

exports.deleteNews = (req, res, next) => {
  const newsID = req.params.uuid;
  const { userID } = req.userData;

  News.getNewsbyID(newsID, (err, searchResponse) => {
    if (searchResponse) {
      if (searchResponse.creatorID === userID) {
        News.delete(newsID, (error, deleteResponse) => {
          if (deleteResponse) {
            res.status(200).json({
              message: "Deleted Successfully",
            });
          }
        });
      } else {
        res.status(401).json({
          message: "You are not authorized to do this",
        });
      }
    } else {
      res.status(404).json({
        message: "No news found",
      });
    }
  });
};

exports.updateNews = (req, res, next) => {
  const { userID } = req.userData;
  const newsID = req.params.uuid;
  const { title, category, content, image } = req.body;
  News.getNewsbyID(newsID, (searchError, news) => {
    if (news) {
      if (news.creatorID === userID) {
        if (title) {
          news.title = title;
        }
        if (category) {
          news.category = category;
        }
        if (content) {
          news.content = content;
        }
        if (image) {
          news.image = image;
        }
        News.updateNews(news, (updateError, updateResponse) => {
          if (!updateError) {
            res.status(200).json({
              message: "News Updated Successfully",
            });
          } else {
            res.status(400).json({
              message: "Something went wrong",
            });
          }
        });
      } else {
        res.status(401).json({
          message: "You are not authorized to do this",
        });
      }
    } else {
      res.status(404).json({
        message: "No News Found!!",
      });
    }
  });
};
