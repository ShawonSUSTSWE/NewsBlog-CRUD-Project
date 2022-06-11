const express = require("express");
const newsController = require("../controllers/newsController");
const { authenticate } = require("../utils/authenticate");
const {
  newsPublishValidator,
  newsUpdateValidator,
} = require("../utils/newsValidator");

const router = express.Router();
router.get("/", newsController.getAllNews);
router.get("/:uuid", newsController.getNewsbyUser);

router.use(authenticate);

router
  .route("/")
  .post(newsPublishValidator, newsController.publishNews)
  .put(newsUpdateValidator, newsController.updateNews);
router.delete("/:uuid", newsController.deleteNews);

module.exports = router;
