var passwords;
var types = require('sequelize');
var db = require('../db');

module.exports = db.define('passwords', {
    hash: types.STRING
}, {
    classMethods: {
        authorize: function (user_id, password) {
            return this.findAndCountAll({where: {userId: user_id, hash: this.hash(password)}});
        },
        change: function (user_id, old, updated) {
            return this.authorize(user_id, old).then(function (data) {
                if (data.length === 1) {
                    this.update(user_id, {hash: this.hash(updated)});
                }
            });
        },
        remove: function (id) {
            return this.destroy({where: {id: id}});
        },
        hash: function (password) {
            return password;
        }
    }
});