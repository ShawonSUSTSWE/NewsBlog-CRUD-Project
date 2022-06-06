const dbConnection = require("../config/db_config");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

class User {
  constructor(name, email, password, dept, avatar) {
    this.userID = uuidv4();
    this.name = name;
    this.email = email;
    this.password = password;
    this.dept = dept;
    this.avatar = avatar;
  }
  static createUser(newUser, result) {
    bcrypt.hash(newUser.password, 12).then((hash) => {
      newUser.password = hash;
      dbConnection.query("INSERT INTO tbl_user SET ?", newUser, (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(err, null);
        } else {
          console.log("User created Successfully");
          result(null, res);
        }
      });
    });
  }
  static findbyEmail(email, result) {
    dbConnection.query(
      "SELECT * FROM tbl_user WHERE email = ?",
      email,
      (err, res) => {
        if (err) {
          console.log(err);
          result(err, null);
        } else {
          result(null, res);
        }
      }
    );
  }
  static getUsers(result) {
    dbConnection.query("Select * from tbl_user", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("users : ", res);
        result(null, res);
      }
    });
  }
  static delete(id, result) {
    dbConnection.query(
      "DELETE FROM employees WHERE id = ?",
      [id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          result(null, res);
        }
      }
    );
  }
}

module.exports = User;
