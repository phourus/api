var types = require('sequelize');
var db = require('../db');

var users = require('./users');
var tags = require('./tags');
var links = require('./links');
var locations = require('./locations');
var views = require('./views');
var thumbs = require('./thumbs');
var comments = require('./comments');

var posts = db.define('posts', {
  // Common
  id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
  created: {type: types.DATE, defaultValue: types.NOW},
  modified: types.DATE,
  privacy: {type: types.ENUM('public', 'phourus', 'private'), defaultValue: 'private'},
  type: types.ENUM('blog', 'event', 'subject', 'question', 'debate', 'poll', 'quote', 'belief'),
  title: types.STRING,
  content: types.TEXT,
  element: types.ENUM('world', 'mind', 'voice', 'self'),
  category: types.STRING(20),
  lat: types.FLOAT,
  lng: types.FLOAT,

  // Stats
  totalComments: {type: types.INTEGER, defaultValue: 0},
  totalViews: {type: types.INTEGER, defaultValue: 0},
  totalThumbs: {type: types.INTEGER, defaultValue: 0},
  popularity: {type: types.INTEGER, defaultValue: 0},
  influence: {type: types.INTEGER, defaultValue: 0},

  // Meta
  parent_id: types.INTEGER,
  difficulty: {type: types.ENUM('easy', 'medium', 'hard'), allowNull: true},
  positive: types.BOOLEAN,
  scope: {type: types.ENUM('local', 'county', 'state', 'national', 'international'), allowNull: true},
  zip: types.STRING(5),
  author: types.STRING,
  vote: types.BOOLEAN
}, {
  classMethods: {
    single: function (id) {
      return this.findOne({where: {id: id},
        include: [
          {model: users, as: 'user'},
          {model: tags, as: 'tags'},
          {model: links, as: 'links'}
        ]
      });
    },
    collection: function (params) {
      return this.findAndCountAll(this.queryize(params));
    },
    add: function (model) {
      return this.create(model);
    },
    save: function (id, model) {
      return this.update(model, {where: {id: id, userId: model.userId}});
    },
    remove: function (id) {
      return this.destroy({where: {id: id, userId: model.userId}});
    },
    account: function () {
      return this.findAndCountAll({where: {userId: model.userId}});
    },
    updateStats: function (id) {
      var self, where, viewTotal, commentTotal, thumbTotal;
      where = {where: {postId: id}};
      wherePost = {where: {id: id}};
      self = this;
      // views
      viewTotal = views.count(where)
      .then(function (data) {
        var model = {views: data};
        self.update(model, wherePost);
      });
      // comments
      commentTotal = comments.count(where)
      .then(function (data) {
        var model = {comments: data};
        self.update(model, wherePost);
      });
      // thumbs
      thumbTotal = thumbs.count({where: {id: id}})
      .then(function (data) {
        var model = {thumbs: data};
        self.update(model, wherePost);
      });
    },
    queryize: function (params) {
      var defaults = {};
      var query = {};

      /** DEFAULTS **/
      // sort: influence, comments, views, popularity, thumbs, date, location
      defaults.sort = 'influence';
      defaults.direction = 'DESC';
      defaults.page = 1;
      defaults.limit = 10;

      /** STANDARD **/
      query.order = (params.sort || defaults.sort) + ' ' + (params.direction || defaults.direction);
      query.offset = ((params.page || defaults.page) - 1) * (defaults.limit || params.limit);
      query.limit = params.limit || defaults.limit;
      query.where = {};

      /** WHERE **/
      // EXCLUDE
      // .isArray does not seem to work here, used instanceof instead
      // do not support strings, arrays only
      if (params.exclude && params.exclude instanceof Array && params.exclude.length) {
          console.log(params.exclude);
          query.where.type = { not: params.exclude }
      }

      // USER_ID
      if (params.user_id) {
          query.where.userId = params.user_id;
      }

      // SEARCH
      // basic search: title, content
      // advanced search: category, subcategory
      // specific search: question, author
      if (params.search && params.search !== '') {
          var term = { like:  '%' + params.search + '%' };
          query.where = types.or(
              { title: term },
              { content: term }
          );
      }

      // DATE
      if (params.startDate && params.endDate) {
          query.where.createdAt = {};
          query.where.createdAt.between = [params.startDate, params.endDate];
      }
      if (params.startDate) {
          query.where.createdAt = {};
          query.where.createdAt.gt = params.startDate;
      }
      if (params.endDate) {
          query.where.createdAt = {};
          query.where.createdAt.lt = params.endDate;
      }
      /** ADVANCED **/
      // groups, location, org_id

      /** USER ASSOCIATION **/
      query.include = [
          {model: users, as: 'user', include: [locations]},
          {model: tags, as: 'tags'},
          {model: links, as: 'links'},
      ];
      return query;
    }
  }
});

// users
// users.hasOne posts gives postId on user
posts.belongsTo(users);

// links
posts.hasMany(links);
links.belongsTo(posts);

// tags
posts.hasMany(tags);
tags.belongsTo(posts);

// views
posts.hasMany(views);
views.belongsTo(posts);

// thumbs
posts.hasMany(thumbs);
thumbs.belongsTo(posts);

// comments
posts.hasMany(comments);
comments.belongsTo(posts);

module.exports = posts;
