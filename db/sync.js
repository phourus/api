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

Users.sync();
Passwords.sync();

Posts.sync();
Links.sync();
Tags.sync();
Locations.sync();

Views.sync(); 
Thumbs.sync();  
Comments.sync();

/*
Orgs.sync();
Members.sync();
Clout.sync();
Reviews.sync();
*/