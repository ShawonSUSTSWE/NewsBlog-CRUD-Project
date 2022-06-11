const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: Bearer <token>
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = {
      userID: decodedToken.userID,
      email: decodedToken.email,
      name: decodedToken.name,
    };
    next();
  } catch (err) {
    console.log(err);
  }
};

//exports.authenticate = authenticate;
//console.log(module);
