const dbConnection = require("../config/db_config");
const { v4: uuid } = require("uuid");

class User {
  constructor(user) {
    this.userID = uuidv4();
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.dept = user.dept;
    this.avatar = user.avatar;
  }
}

module.exports = User;
