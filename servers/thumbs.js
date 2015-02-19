var ws = require('../socket').of('/thumbs');
var thumbs = require('../models/thumbs');
var router = require('express').Router();
var rest = require('../rest').use('/thumbs', router);

/** WEBSOCKET IMPLEMENTATION **/
ws.on('connection', function (socket) {
  console.log('connected to thumbs server');
  thumbs.SESSION_USER = socket.request.user_id;
  
  socket.on('getSingle', function (id) {
      thumbs.single(id)
        .then(function (data) {
            socket.emit('single', 200, data); 
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('single', 503);
        });
  });
  socket.on('getCollection', function (params) {
      thumbs.collection(params)
        .then(function (data) {
            socket.emit('collection', 200, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('collection', 503);
        });  
  });
  socket.on('postAdd', function (model) {
    thumbs.add(model)
        .then(function (data) {
            socket.emit('add', 201, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('add', 503);
        }); 
  });
  socket.on('putSave', function (id, model) {
    thumbs.save(id, model)
        .then(function (data) {
            socket.emit('save', 204, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('save', 503);
        });
  });
  socket.on('delRemove', function (id) {
    thumbs.remove(id)
        .then(function (data) {
            socket.emit('remove', 204, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('remove', 503);
        });
  });
});
