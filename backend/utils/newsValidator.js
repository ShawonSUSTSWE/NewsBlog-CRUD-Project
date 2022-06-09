const { check } = require("express-validator");

exports.newsPublishValidator = [
  check("title", "News must have a title").notEmpty(),
  check("content", "News must have contain some content").notEmpty(),
  check("category", "News must be under a category").notEmpty(),
];

exports.newsUpdateValidator = [
  check("title", "News must have a title").notEmpty(),
  check("content", "News must have contain some content").notEmpty(),
  check("category", "News must be under a category").notEmpty(),
];
