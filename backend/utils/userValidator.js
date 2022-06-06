const { check } = require("express-validator");

exports.userCreationValidator = [
  check("name", "Name cannot be empty").notEmpty(),
  check("email", "Enter a valid mail").isEmail(),
  check("password", "Enter a password with at least 6 characters").isLength({
    min: 6,
  }),
];
