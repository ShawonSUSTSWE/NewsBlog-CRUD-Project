const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; // Authorization: Bearer <token>
  const decodedToken = jwt.verify(token, process.env.JWT_KEY);
  req.userData = {
    userID: decodedToken.userID,
    email: decodedToken.email,
    name: decodedToken.name,
  };
  next();
};

module.exports = checkToken;
