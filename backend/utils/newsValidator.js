const validate = require("express-validate");

exports.newsPublishValidator = [
  validate("title", "News must have a title").notEmpty(),
  validate("content", "News must have contain some content").notEmpty(),
  validate("category", "News must be under a category").notEmpty(),
];
