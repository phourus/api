var types = require('sequelize');
var db = require('../db');

module.exports = db.define('users', {
    id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
    status: types.ENUM('new', 'active', 'inactive'),
    username: types.STRING(20),
    first: types.STRING(40),
    last: types.STRING(40),
    email: types.STRING(60),
    phone: types.STRING(20),
    gender: types.ENUM('M', 'F', '?'),
    occupation: types.STRING(40),
    company: types.STRING(40),
    website: types.STRING(80),
    dob: types.DATE,
    influence: types.INTEGER,
    img: types.STRING
}, {
    classMethods: {
        single: function (id) {
            return this.findOne(id);
        },
        collection: function (params) {
            return this.findAndCountAll(this.queryize(params));
        },
        add: function (model) {
            return this.create(model);
        },
        save: function (id, model) {
            return this.update(model, {where: {id: id}});
        },
        remove: function (id) {
            return this.destroy({where: {id: id}});
        },
        queryize: function (params) {
            return {};
        }
    }
});

