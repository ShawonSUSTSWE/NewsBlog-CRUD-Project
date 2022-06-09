const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const {
  newsPublishValidator,
  newsUpdateValidator,
} = require("../utils/newsValidator");

router
  .route("/")
  .get(newsController.getAllNews)
  .post(newsPublishValidator, newsController.publishNews)
  .put(newsUpdateValidator, newsController.updateNews);

router.get("/:uuid", newsController.getNewsbyUser);
router.delete("/:uuid", newsController.deleteNews);

module.exports = router;
