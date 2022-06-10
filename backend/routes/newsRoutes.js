const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const { authenticate } = require("../utils/authenticate");
const {
  newsPublishValidator,
  newsUpdateValidator,
} = require("../utils/newsValidator");

router.get("/", newsController.getAllNews);

//router.use(authenticate);
router.post("/", newsPublishValidator, newsController.publishNews);

router
  .route("/:uuid")
  .get(newsController.getNewsbyUser)
  .put(newsUpdateValidator, newsController.updateNews);
router.delete("/:uuid", newsController.deleteNews);

module.exports = router;
