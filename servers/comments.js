var ws = require('../socket').of('/comments');
var comments = require('../models/comments');
var router = require('express').Router();
var rest = require('../rest').use('/comments', router);

/** WEBSOCKET IMPLEMENTATION **/
ws.on('connection', function (socket) {
  console.log('connected to comments server');
  comments.SESSION_USER = socket.request.user_id;
  
  socket.on('collection', function (params) {
      console.log(params);
      comments.collection(params)
        .then(function (data) {
            console.log(data);
            socket.emit('returnCollection', data);
        })
        .catch(function (err) {
            console.log(err);
        });  
  });
  socket.on('add', function (model) {
    comments.add(model)
        .then(function (data) {
            socket.emit('returnAdd', data);
        })
        .catch(function (err) {
            console.log(err);
        }); 
  });
  socket.on('save', function (id, model) {
    comments.save(id, model)
        .then(function (data) {
            socket.emit('returnSave', data);
        })
        .catch(function () {
            
        });
  });
  socket.on('remove', function (id) {
    comments.remove(model)
        .then(function (data) {
            socket.emit('returnRemove', data);
        })
        .catch(function () {
            
        });
  });
});