const express = require("express");
const newsController = require("../controllers/newsController");
const { authenticate } = require("../utils/authenticate");
const { newsPublishValidator } = require("../utils/newsValidator");

const router = express.Router();
router.get("/", newsController.getAllNews);
router.get("/mynews", authenticate, newsController.getOwnNews);
router.get("/:uuid", newsController.getNews);
router.get("/user/:uuid", newsController.getNewsbyUser);

router.use(authenticate);

router.post("/", newsPublishValidator, newsController.publishNews);

router
  .route("/:uuid")
  .put(newsController.updateNews)
  .delete(newsController.deleteNews);

module.exports = router;
