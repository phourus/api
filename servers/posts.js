var ws = require('../socket').of('/posts');
var posts = require('../models/posts');
var views = require('../models/views');
var router = require('express').Router();
var rest = require('../rest').use('/posts', router);

/** WEBSOCKET IMPLEMENTATION **/
ws.on('connection', function (socket) {
  console.log('connected to posts server');
  posts.SESSION_USER = socket.request.user_id;
  
  socket.on('single', function (id) {
      posts.single(id)
        .then(function (data) {
            socket.emit('returnSingle', 200, data); 
            posts.updateStats(id);
            views.add({post_id: id});
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnSingle', 503);
        });
  });
  socket.on('collection', function (params) {
      console.log(socket.request.user_id);
      posts.collection(params)
        .then(function (data) {
            socket.emit('returnCollection', 200, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnCollection', 503);
        });
  });
  socket.on('add', function (model) {
    posts.add(model)
        .then(function (data) {
            console.log(data);
            socket.emit('returnAdd', 201, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnAdd', 503);
        }); 
  });
  socket.on('save', function (id, model) {
    posts.save(id, model)
        .then(function (data) {
            socket.emit('returnSave', 204, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnSave', 503);
        });
  });
  socket.on('remove', function (id) {
    posts.remove(model)
        .then(function (data) {
            socket.emit('returnRemove', 202, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnRemove', 503);
        });
  });
  socket.on('account', function () {
     posts.account() 
        .then(function (data) {
            socket.emit('returnAccount', 200, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnRemove', 503);
        });
  });
});