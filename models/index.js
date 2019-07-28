"use strict";

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    process.env.DB,
    process.env.DBUSER,
    process.env.DBPASSWORD,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  // js 확장자 붙은 모델들을 모두 가져와서 읽어 DB 에 table 을 sequelize 문으로 생성해준다.
  .forEach(file => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.User = require("./user")(sequelize, Sequelize);
// db.Pet = require("./pet")(sequelize, Sequelize);
// db.Board = require("./board")(sequelize, Sequelize);
// db.Comment = require("./comment")(sequelize, Sequelize);
// db.Like = require("./like")(sequelize, Sequelize);
// db.Sos = require("./sos")(sequelize, Sequelize);

module.exports = db;
