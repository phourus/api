var ws = require('../socket').of('/users');
var users = require('../models/users');
var views = require('../models/views');
var router = require('express').Router();
var rest = require('../rest').use('/users', router);

/** WEBSOCKET IMPLEMENTATION **/
ws.on('connection', function (socket) {
  console.log('connected to users server');
  socket.on('single', function (id) {
      users.single(id)
        .then(function (data) {
            socket.emit('returnSingle', 200, data); 
            views.add({user_id: id});
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnSingle', 503);
        });
  });
  socket.on('collection', function (params) {
      users.collection(params)
        .then(function (data) {
            socket.emit('returnCollection', 200, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnCollection', 503);
        });  
  });
  socket.on('create', function (model) {
    users.create(model)
        .then(function (data) {
            socket.emit('returnCreate', 201, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnCreate', 503);
        });  
  });
  socket.on('save', function (id, model) {
    users.save(id, model)
        .then(function (data) {
            socket.emit('returnSave', 204, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnSave', 503);
        });  
  });
  socket.on('remove', function (id) {
    users.remove(model)
        .then(function (data) {
            socket.emit('returnRemove', 204, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnRemove', 503);
        });  
  });
});