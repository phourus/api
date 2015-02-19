var tags;
var types = require('sequelize');
var db = require('../db');

module.exports = tags = db.define('tags', {
    id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
    //post_id: types.INTEGER,
    tag: types.STRING(20) 
}, {
    classMethods: {
        single: function (id) {
            return this.findOne(id);
        },
        collection: function (params) {
            return this.findAll(this.queryize(params));
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
            console.log(params);
            if (params.post_id) {
                return {where: {postId: params.post_id}};
            }    
            
            return {where: {id: 0}};
        }
    }
});