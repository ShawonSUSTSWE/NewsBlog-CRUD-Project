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
      console.log(newUser.password);
      dbConnection.query("INSERT INTO tbl_user SET ?", newUser, (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(err, null);
        } else {
          console.log("User created Successfully");
          this.searchForEmail(newUser.email, (err, user) => {
            if (err) {
              console.log(err);
            } else {
              result(null, user);
            }
          });
        }
      });
    });
  }
  static findbyID(id, result) {
    console.log(`ID: ${id}`);
    dbConnection.query(
      "SELECT * FROM tbl_user WHERE userID = ?",
      id,
      (err, res) => {
        if (err) {
          console.log(err);
          result(err, null);
        } else {
          result(null, res[0]);
        }
      }
    );
  }
  static searchForEmail(email, result) {
    const myQuery = "SELECT * FROM tbl_user WHERE email = ?";
    dbConnection.query(myQuery, email, (err, res, field) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        if (res[0]) {
          //console.log(bcrypt.compareSync(res[0].password, password));
        }
        result(null, res[0]);
      }
    });
  }
  static getUsers(result) {
    dbConnection.query("Select * from tbl_user", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("users : ", res);
        result(null, res);
      }
    });
  }
  static updateUser(user, result) {
    dbConnection.query(
      "UPDATE tbl_user SET name = ?, password = ?, dept = ?, avatar = ? WHERE userID = ?",
      [user.name, user.password, user.dept, user.avatar, user.userID],
      (err, res) => {
        if (err) {
          console.log("ERROR: ", err);
          result(err, null);
        } else {
          console.log("User updated successfully");
          result(null, res[0]);
        }
      }
    );
  }
}

module.exports = User;
