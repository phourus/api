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
            socket.emit('returnCollection', 200, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnCollection', 503);
        });  
  });
  socket.on('add', function (model) {
    comments.add(model)
        .then(function (data) {
            socket.emit('returnAdd', 201, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnAdd', 503);
        }); 
  });
  socket.on('save', function (id, model) {
    comments.save(id, model)
        .then(function (data) {
            socket.emit('returnSave', 204, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnSave', 503);
        });
  });
  socket.on('remove', function (id) {
    comments.remove(model)
        .then(function (data) {
            socket.emit('returnRemove', 204, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnRemove', 503);
        });
  });
});