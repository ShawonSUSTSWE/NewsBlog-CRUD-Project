const dbConnection = require("../config/db_config");
const { v4: uuid } = require("uuid");

class News {
  constructor(news) {
    this.userID = uuidv4();
    this.title = news.title;
    this.category = news.category;
    this.timedate = news.timedate;
    this.content = news.content;
    this.image = news.image;
  }
}

module.exports = News;
