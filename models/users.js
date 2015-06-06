var types = require('sequelize');
var db = require('../db');

var passwords = require('./passwords');
var locations = require('./locations');
var views = require('./views');
var thumbs = require('./thumbs');
var comments = require('./comments');


var users = db.define('users', {
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
      return this.update(model, {where: {id: id, user_id: this.SESSION_USER}});
    },
    remove: function (id) {
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
// passwords
users.hasOne(passwords);
passwords.belongsTo(users);

// locations
users.hasMany(locations);
locations.belongsTo(users);

// views
users.hasMany(views);
//views.belongsTo(users, {as: "user"});
users.hasMany(views, {foreignKey: {name: 'viewerId'}});
views.belongsTo(users, {as: "viewer"});

// thumbs
users.hasMany(thumbs);
thumbs.belongsTo(users);

// comments
users.hasMany(comments);
comments.belongsTo(users);

module.exports = users
