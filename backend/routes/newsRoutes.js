const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const { newsPublishValidator } = require("../utils/newsValidator");

router.route("/").post(newsPublishValidator, newsController.publishNews);

module.exports = router;
