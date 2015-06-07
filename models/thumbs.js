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
      return this.create(model);
    },
    save: function (id, model) {
      return this.update(model, {where: {id: id}});
    },
    remove: function (id) {
      return this.destroy({where: {id: id}});
    },
    queryize: function (params) {
      // default to zero comments otherwise missing params will get all
      var query = {
        where: {
          id: 0
        }
      };
      if (params.post_id) {
        query.where = {
          postId: params.post_id
        }
      }
      return query;
    }
  }
});
