var PATH = '../models/';
require('../db');
var Clout = require(PATH + 'clout');
var Comments = require(PATH + 'comments');
var Links = require(PATH + 'links');
var Locations = require(PATH + 'locations');
var Members = require(PATH + 'members');
var Orgs = require(PATH + 'orgs');
var Passwords = require(PATH + 'passwords');
var Posts = require(PATH + 'posts');
var Reviews = require(PATH + 'reviews');
var Tags = require(PATH + 'tags');
var Thumbs = require(PATH + 'thumbs');
var Users = require(PATH + 'users');
var Views = require(PATH + 'views');

/** SYNC **/
var synchronize = function () {
    Clout.sync();
    Comments.sync();
    Links.sync();
    Locations.sync();
    Members.sync();
    Orgs.sync();
    Passwords.sync();
    Posts.sync();
    Reviews.sync();
    Tags.sync();
    Thumbs.sync();
    Users.sync();
    Views.sync();   
}
synchronize();

/** ASSOCIATIONS **/
var associations = function () {
    Posts.hasOne(Users);
    Posts.hasOne(Locations);
    //Posts.hasMany(Comments);
    Posts.hasMany(Links);
    Posts.hasMany(Tags);
    // parent_id: question_id, bill_id, debate_id 
    // rep_id: not needed (optional parent_id, user_id = rep_id)
    // totals only?
    //Posts.hasMany(Thumbs);
    //Posts.hasMany(Views);
    Orgs.hasMany(Members);
    Locations.belongsTo(Orgs);
    Locations.belongsTo(Users);
    Locations.belongsTo(Posts);
    Clout.belongsTo(Orgs);
    Comments.hasOne(Users);
    Comments.hasOne(Posts);
    Links.belongsTo(Posts);
    Members.belongsTo(Orgs);
    Passwords.hasOne(Users);
    Reviews.hasOne(Orgs);
    Tags.belongsTo(Posts);
    Thumbs.belongsTo(Posts);
}
//associations();