var ws = require('../socket').of('/links');
var links = require('../models/links');
var router = require('express').Router();
var rest = require('../rest').use('/links', router);

/** WEBSOCKET IMPLEMENTATION **/
ws.on('connection', function (socket) {
  console.log('connected to links server');
  socket.on('single', function (id) {
      links.single(id)
        .then(function (data) {
            socket.emit('returnSingle', data); 
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnSingle', 503);
        });
  });
  socket.on('collection', function (params) {
      links.collection(params)
        .then(function (data) {
            socket.emit('returnCollection', data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnCollection', 503);
        });  
  });
  socket.on('add', function (model) {
    links.add(model)
        .then(function (data) {
            socket.emit('returnAdd', data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnAdd', 503);
        }); 
  });
  socket.on('save', function (id, model) {
    links.save(id, model)
        .then(function (data) {
            socket.emit('returnSave', data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnSave', 503);
        });
  });
  socket.on('remove', function (id) {
    links.remove(id)
        .then(function (data) {
            socket.emit('returnRemove', data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnRemove', 503);
        });
  });
});