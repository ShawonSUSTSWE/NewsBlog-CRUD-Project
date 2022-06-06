const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const newsRoutes = require("./newsRoutes");

router.use("/users", userRoutes);
router.use("/news", newsRoutes);

router.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

router.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

module.exports = router;
