var config = require("./config").get('db');
var Sequelize = require('sequelize');
var db = config.name;
var username = config.user;
var password = config.pass;
var config = {
    host: config.host,
    dialect: 'mariadb'
};

module.exports = new Sequelize(db, username, password, config);
