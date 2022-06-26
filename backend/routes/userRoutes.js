const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate } = require("../utils/authenticate");
const {
  userCreationValidator,
  userUpdateValidator,
} = require("../utils/userValidator");

router
  .route("/")
  .get(userController.getUsers)
  .post(userCreationValidator, userController.createUser)
  .put(authenticate, userController.updateUser);

router.get("/:uuid", userController.getUser);
router.post("/login", userController.logIn);

module.exports = router;
