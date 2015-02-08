var Sequelize = require('sequelize');
var db = 'phourus:dev';
var username = 'root';
var password = '';
var config = {
    host: 'localhost',
    dialect: 'mariadb'
};

module.exports = new Sequelize(db, username, password, config);