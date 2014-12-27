var types = require('sequelize');
var db = require('../db');

module.exports = db.define('locations', {
    id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true}, 
    org_id: types.INTEGER,
    user_id: types.INTEGER,
    street: types.STRING(120),
    city: types.STRING(40),
    county: types.STRING(20),
    state: types.STRING(2),
    country: types.STRING(20),
    zip: types.STRING(5),
    lat: types.STRING(20),
    lng: types.STRING(20),
    type: types.ENUM('primary', 'business', 'residential', 'mailing')
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

