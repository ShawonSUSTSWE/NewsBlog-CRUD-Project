const express = require("express");
const userRoutes = require("./userRoutes");
const newsRoutes = require("./newsRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/news", newsRoutes);

module.exports = router;
