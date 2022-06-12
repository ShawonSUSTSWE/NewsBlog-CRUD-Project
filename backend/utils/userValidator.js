const { check } = require("express-validator");

exports.userCreationValidator = [
  check("name", "Name cannot be empty").notEmpty(),
  check("email", "Enter a valid mail").isEmail(),
  check("password", "Enter a password with at least 6 characters").isLength({
    min: 6,
  }),
];

exports.userUpdateValidator = [
  check(
    "newPassword",
    "Password must be at least 6 characters long and different than the old one"
  ).custom((val, { req }) => {
    if (
      !req.body.oldPassword ||
      (val !== req.body.oldPassword && val.length >= 6)
    )
      return true;
    throw new Error();
  }),
];
