const validate = require("express-validator");

exports.userCreationValidator = [
  validate("name", "Name cannot be empty").notEmpty(),
  validate("email", "Enter a valid mail").isEmail(),
  validate("password", "Enter a password with at least 6 characters").isLength({
    min: 6,
  }),
];
