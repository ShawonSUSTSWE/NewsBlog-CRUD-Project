const dbConnection = require("../config/db_config");
const { v4: uuidv4 } = require("uuid");

class News {
  constructor(title, category, content, image) {
    this.newsID = uuidv4();
    this.title = title;
    this.category = category;
    this.content = content;
    this.image = image;
  }
}

module.exports = News;
