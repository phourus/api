var types = require('sequelize');
var db = require('../db');

module.exports = db.define('posts', {
    // Common
    id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
    created: {type: types.DATE, defaultValue: types.NOW},
    modified: types.DATE,
    user_id: {type: types.INTEGER, allowNull: false},
    privacy: {type: types.ENUM('public', 'phourus', 'private'), defaultValue: 'private'},
    type: types.ENUM('blogs', 'events', 'subjects', 'questions', 'answers', 'debates', 'bills', 'votes', 'quotes', 'timeline'),
    title: types.STRING,
    content: types.TEXT,
    element: types.ENUM('world', 'mind', 'voice', 'self'),
    category: types.STRING(20),
    lat: types.FLOAT,
    lng: types.FLOAT,
    
    // Stats
    comments: {type: types.INTEGER, defaultValue: 0},
    views: {type: types.INTEGER, defaultValue: 0},
    thumbs: {type: types.INTEGER, defaultValue: 0},
    popularity: {type: types.INTEGER, defaultValue: 0},
    influence: {type: types.INTEGER, defaultValue: 0},
    
    // Composed
/*
    address: ,
    links: ,
    tags: ,
*/
    
    // Meta
    question_id: types.INTEGER,
    bill_id: types.INTEGER,
    debate_id: types.INTEGER,
    rep_id: types.INTEGER,
    address_id: types.INTEGER,
    question: types.STRING,
    deadline: types.DATE,
    date: types.DATE,
    time: types.DATE,
    difficulty: {type: types.ENUM('easy', 'medium', 'hard'), allowNull: true},
    positive: types.BOOLEAN,
    scope: {type: types.ENUM('local', 'county', 'state', 'national'), allowNull: true},
    zip: types.STRING(5),
    author: types.STRING,
    vote: types.BOOLEAN
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
                query.where.user_id = params.user_id;
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
            
            return query;
        }
    }
});