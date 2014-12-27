var types = require('sequelize');
var db = require('../db');

module.exports = db.define('views', {
    id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true}, 
    ip: types.STRING(20),
    path: types.STRING,
    user_id: types.INTEGER,
    org_id: types.INTEGER,
    post_id: types.INTEGER,
    location: types.STRING,
    viewer_id: types.INTEGER,
    referer: types.STRING,
    exit: types.STRING
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

