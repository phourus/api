var types = require('sequelize');
var db = require('../db');

module.exports = db.define('thumbs', {
    id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true}, 
    positive: types.BOOLEAN
}, {
    classMethods: {
        single: function (post_id) {
            return this.findOne({where: {post_id: post_id, user_id: this.SESSION_USER}});
        },
        collection: function (params) {
            return this.findAndCountAll(this.queryize(params));
        },
        add: function (model) {
            if (this.SESSION_USER === false) {
                return 401;
            }
            model.user_id = this.SESSION_USER
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

