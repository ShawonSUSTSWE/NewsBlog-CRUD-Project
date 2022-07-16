const dbConnection = require("../config/db_config");
const { v4: uuidv4 } = require("uuid");
const User = require("./userModel");

class News {
  constructor(title, category, content, image, creatorID) {
    this.newsID = uuidv4();
    this.title = title;
    this.category = category;
    this.content = content;
    this.image = image;
    this.creatorID = creatorID;
  }
  static publishNews(newNews, result) {
    dbConnection.query("INSERT INTO tbl_news SET ?", newNews, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log("News published Successfully");
        result(null, res);
      }
    });
  }
  static getNewsbyID(id, result) {
    dbConnection.query(
      "SELECT * FROM tbl_news WHERE newsID = ?",
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
  static getNewsbyUser(id, result) {
    dbConnection.query(
      "SELECT tbl_news.newsID, tbl_news.title, tbl_news.category, tbl_news.content, tbl_news.image, tbl_news.creatorID, tbl_user.name FROM tbl_news JOIN tbl_user ON tbl_news.creatorID = tbl_user.userID WHERE creatorID = ?",
      id,
      (err, res) => {
        if (err) {
          console.log(err);
          result(err, null);
        } else {
          console.log(res);
          result(null, res);
        }
      }
    );
  }
  static getAllNews(result) {
    dbConnection.query(
      "SELECT tbl_news.newsID, tbl_news.title, tbl_news.category, tbl_news.content, tbl_news.image, tbl_news.creatorID, tbl_user.name FROM tbl_news JOIN tbl_user ON tbl_news.creatorID = tbl_user.userID",
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          console.log("News : ", res);
          result(null, res);
        }
      }
    );
  }
  static delete(id, result) {
    dbConnection.query(
      "DELETE FROM tbl_news WHERE newsID = ?",
      [id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          result(null, res);
        }
      }
    );
  }
  static updateNews(news, result) {
    dbConnection.query(
      "UPDATE tbl_news SET title = ?, category = ?, content = ?, image = ? WHERE newsID = ?",
      [news.title, news.category, news.content, news.image, news.newsID],
      (err, res) => {
        if (err) {
          console.log("ERROR: ", err);
          result(err, null);
        } else {
          console.log("News updated successfully");
          result(null, res[0]);
        }
      }
    );
  }
}

module.exports = News;
