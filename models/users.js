var types = require('sequelize');
var db = require('../db');

module.exports = db.define('users', {
    id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
    status: types.ENUM('new', 'active', 'inactive', 'closed'),
    username: types.STRING(20),
    first: types.STRING(40),
    last: types.STRING(40),
    email: types.STRING(60),
    phone: types.STRING(20),
    gender: types.ENUM('M', 'F', 'O', 'P'),
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
            if (this.SESSION_USER === false) {
                return 401;
            }
            return this.update(model, {where: {id: id, user_id: this.SESSION_USER}});
        },
        remove: function (id) {
            if (this.SESSION_USER === false) {
                return 401;
            }
            return this.destroy({where: {id: id, user_id: this.SESSION_USER}});
        },
        queryize: function (params) {
            return {};
        },
        getID: function (username) {
            return this.findOne({where: types.or({username: username}, {email: username}) });
        }
    }
});

