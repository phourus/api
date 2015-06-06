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
  console.log(SESSION_USER);

  socket.on('postRegister', function (email, password) {           
    return db.transaction(function (t) {
      return users.create({email: email}, {transaction: t})
        .then(function (user) {
            var hash = passwords.hash(password);
            return passwords.create({user_id: user.id, hash: hash}, {transaction: t});
        });
    })
    .then(function (result) {
        console.log(result);
        socket.emit('register', 202);
    })
    .catch(function (err) {
        console.error(err);
        // duplicate email
        socket.emit('register', 409);
    });
  });
  socket.on('postLogin', function (username, password) {
      return users.getID (username)
        .then(function (data) {
            if (data === null) {
                console.error('username not found');
                socket.emit('login', 503);
                //done();
            }
            return data.id;
        })
        .then(function (user_id) {
            return passwords.authorize(user_id, password)
                .then(function (data) {
                    if (data.count !== 1) {
                        console.error('user_id + hash not found');
                        socket.emit('login', 503);
                    }
                    return user_id;
                });
        })
        .then(function (result) {
            if (result !== 0) {
                result = jwt.sign({user_id: result}, '123abc');  
            }
            socket.emit('login', 200, result);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('login', 503);
        });  
  });
  socket.on('getGet', function (id, model) {
    users.single(SESSION_USER)
        .then(function (data) {
            socket.emit('get', 200, data);
        })
        .catch(function (err) {
            console.log(err);
            socket.emit('get', 503);
        });
  });
  socket.on('putEdit', function (model) {
    users.update(model, {where: {id: SESSION_USER}})
        .then(function (data) {
            console.log(data);
            socket.emit('edit', 204, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('edit', 503);
        });
  });
  socket.on('delDeactivate', function () {
    users.update({status: 'closed'}, {where: {id: SESSION_USER}})
        .then(function (data) {
            socket.emit('deactivate', 202, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('deactivate', 503);
        });
  });
  socket.on('putPassword', function (current, changed) {
     var hash = passwords.hash(changed);
     passwords.update({hash: hash}, {where: {user_id: SESSION_USER, hash: passwords.hash(current)}})
        .then(function (data) {
            socket.emit('password', 204, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('password', 503);
        });
  });
  socket.on('getNotifications', function (params) {
     posts.findAll({where: {userId: SESSION_USER}})
        .then(function (data) {
            var promises = [];
            var list = [1,2,3];
            // my profile views
            promises.push(views.findAll({
                where: {userId: SESSION_USER},
                include: [
                    {model: users, as: "viewer"}
                ]
            }));
            // comments on my posts
            promises.push(comments.findAll({
                where: {postId: {in: list}}, 
                include: [
                    {model: users, as: "user"}, 
                    {model: posts, as: "post"}
                ]
            }));
            // thumbs on my posts
            promises.push(thumbs.findAll({
                where: {postId: {in: list}},
                include: [
                    {model: users, as: "user"}, 
                    {model: posts, as: "post"}
                ]
            }));
            // those who have faved me
            //promises.push(favs.findAll({where: {to_id: SESSION_USER}));
            // ? new post by one of my favs
            return db.Promise.all(promises);
        })
        .then(function (data) {
            socket.emit('notifications', 200, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('notifications', 503);
        });
  });
  socket.on('getHistory', function (params) {
        var promises = [];
        // posts, users and orgs I've viewed
        promises.push(views.findAll({
            where: {viewerId: SESSION_USER},
            include: [
                //{model: users, as: "user"},
                {model: posts, as: "post"}
            ]
        }));
        // comments I've made
        promises.push(comments.findAll({
            where: {userId: SESSION_USER},
            include: [
                {model: posts, as: "post", include: [{model: users, as: "user"}]}
            ]
        }));
        // thumbs I gave
        promises.push(thumbs.findAll({
            where: {userId: SESSION_USER},
            include: [
                {model: posts, as: "post", include: [{model: users, as: "user"}]}
            ]
        }));
        // users I've faved
        //promises.push(favs.findAll({where: {from_id: SESSION_USER}));
        
        db.Promise.all(promises)
            .then(function (data) {
                socket.emit('history', 200, data);
            })  
            .catch(function (err) {
                console.log(err);
                socket.emit('history', 503);
            });
  });
});