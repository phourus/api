var ws = require('../socket').of('/account');

var db = require('../db');
var users = require('../models/users');
var passwords = require('../models/passwords');
var posts = require('../models/posts');
var views = require('../models/views');
var comments = require('../models/comments');
var thumbs = require('../models/thumbs');
//var favs = require('../models/favs');
var jwt = require('jsonwebtoken');

//var router = require('express').Router();
//var rest = require('../rest').use('/account', router);

/** WEBSOCKET IMPLEMENTATION **/
ws.on('connection', function (socket) {
  console.log('connected to account server');
  var SESSION_USER = socket.request.user_id;

  socket.on('register', function (email, password) {           
    return db.transaction(function (t) {
      return users.create({email: email}, {transaction: t})
        .then(function (user) {
            var hash = passwords.hash(password);
            return passwords.create({user_id: user.id, hash: hash}, {transaction: t});
        });
    })
    .then(function (result) {
        console.log(result);
        socket.emit('returnRegister', 202);
    })
    .catch(function (err) {
        console.error(err);
        // duplicate email
        socket.emit('returnRegister', 409);
    });
  });
  socket.on('login', function (username, password) {
      return users.getID (username)
        .then(function (data) {
            if (data === null) {
                socket.emit('returnLogin', 503);
                //done();
            }
            return data.id;
        })
        .then(function (user_id) {
            return passwords.authorize(user_id, password)
                .then(function (data) {
                    if (data.count !== 1) {
                        console.log('user_id + hash not found');
                        return 0;
                    }
                    return user_id;
                });
        })
        .then(function (result) {
            if (result !== 0) {
                result = jwt.sign({user_id: result}, '123abc');  
            }
            socket.emit('returnLogin', 200, result);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnLogin', 503);
        });  
  });
  socket.on('get', function (id, model) {
    users.single(SESSION_USER)
        .then(function (data) {
            socket.emit('returnGet', 200, data);
        })
        .catch(function (err) {
            console.log(err);
            socket.emit('returnGet', 503);
        });
  });
  socket.on('edit', function (model) {
    users.update(model, {where: {id: SESSION_USER}})
        .then(function (data) {
            console.log(data);
            socket.emit('returnEdit', 204, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnEdit', 503);
        });
  });
  socket.on('deactivate', function () {
    users.update({status: 'closed'}, {where: {id: SESSION_USER}})
        .then(function (data) {
            socket.emit('returnDeactivate', 202, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnDeactivate', 503);
        });
  });
  socket.on('password', function (current, changed) {
     var hash = passwords.hash(changed);
     passwords.update({hash: hash}, {where: {user_id: SESSION_USER, hash: passwords.hash(current)}})
        .then(function (data) {
            socket.emit('returnPassword', 204, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnPassword', 503);
        });
  });
  socket.on('notifications', function (params) {
     posts.findAll({where: {user_id: SESSION_USER}})
        .then(function (data) {
            var promises = [];
            var list = [1,2,3];
            // my profile views
            promises.push(views.findAll({where: {user_id: SESSION_USER}}));
            // comments on my posts
            promises.push(comments.findAll({where: {post_id: {in: list}}}));
            // thumbs on my posts
            promises.push(thumbs.findAll({where: {post_id: {in: list}}}));
            // those who have faved me
            //promises.push(favs.findAll({where: {to_id: SESSION_USER}));
            // ? new post by one of my favs
            return db.Promise.all(promises);
        })
        .then(function (data) {
            socket.emit('returnNotifications', 200, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnNotifications', 503);
        });
  });
  socket.on('history', function (params) {
        var promises = [];
        // posts, users and orgs I've viewed
        promises.push(views.findAll({where: {viewer_id: SESSION_USER}}));
        // comments I've made
        promises.push(comments.findAll({where: {user_id: SESSION_USER}}));
        // thumbs I gave
        promises.push(thumbs.findAll({where: {user_id: SESSION_USER}}));
        // users I've faved
        //promises.push(favs.findAll({where: {from_id: SESSION_USER}));
        
        db.Promise.all(promises)
            .then(function (data) {
                socket.emit('returnHistory', 200, data);
            })  
            .catch(function (err) {
                console.log(err);
                socket.emit('returnHistory', 503);
            });
  });
});