const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { userCreationValidator } = require("../utils/userValidator");

router
  .route("/")
  .get(userController.getUsers)
  .post(userCreationValidator, userController.createUser);

router.get("/:uuid", userController.getUser);
router.post("/login", userController.logIn);

module.exports = router;
