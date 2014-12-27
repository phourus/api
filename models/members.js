var types = require('sequelize');
var db = require('../db');

module.exports = db.define('members', {
    id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true}, 
    org_id: types.INTEGER,
    user_id: types.INTEGER,
    type: types.STRING(20),
    approved: types.BOOLEAN
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

