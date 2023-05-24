const dbConfig = require("../setting/dbConfig.js");
const Sequelize = require("sequelize");
const DataTypes = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    //operatorsAliases: false,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

sequelize.sync({ force: false });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userModel.js')(sequelize, DataTypes);

module.exports = db;