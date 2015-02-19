var types = require('sequelize');
var db = require('../db');

module.exports = db.define('clout', {
    id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true}, 
    // org_id
    type: types.ENUM('press', 'award'),
    title: types.STRING,
    date: types.DATE,
    content: types.TEXT,
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

