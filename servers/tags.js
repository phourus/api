var ws = require('../socket').of('/tags');
var tags = require('../models/tags');
var router = require('express').Router();
var rest = require('../rest').use('/tags', router);

/** WEBSOCKET IMPLEMENTATION **/
ws.on('connection', function (socket) {
  console.log('connected to tags server');
  socket.on('single', function (id) {
      tags.single(id)
        .then(function (data) {
            socket.emit('returnSingle', 200, data); 
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnSingle', 503);
        });
  });
  socket.on('collection', function (params) {
      tags.collection(params)
        .then(function (data) {
            socket.emit('returnCollection', 200, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnCollection', 503);
        });  
  });
  socket.on('add', function (model) {
    tags.add(model)
        .then(function (data) {
            socket.emit('returnAdd', 201, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnAdd', 503);
        }); 
  });
  socket.on('save', function (id, model) {
    tags.save(id, model)
        .then(function (data) {
            socket.emit('returnSave', 204, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnSave', 503);
        });
  });
  socket.on('remove', function (id) {
    tags.remove(id)
        .then(function (data) {
            socket.emit('returnRemove', 204, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnRemove', 503);
        });
  });
});