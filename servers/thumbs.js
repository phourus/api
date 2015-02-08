var ws = require('../socket').of('/thumbs');
var thumbs = require('../models/thumbs');
var router = require('express').Router();
var rest = require('../rest').use('/thumbs', router);

/** WEBSOCKET IMPLEMENTATION **/
ws.on('connection', function (socket) {
  console.log('connected to thumbs server');
  thumbs.SESSION_USER = socket.request.user_id;
  
  socket.on('single', function (id) {
      thumbs.single(id)
        .then(function (data) {
            socket.emit('returnSingle', 200, data); 
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnSingle', 503);
        });
  });
  socket.on('collection', function (params) {
      thumbs.collection(params)
        .then(function (data) {
            socket.emit('returnCollection', 200, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnCollection', 503);
        });  
  });
  socket.on('add', function (model) {
    thumbs.add(model)
        .then(function (data) {
            socket.emit('returnAdd', 201, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnAdd', 503);
        }); 
  });
  socket.on('save', function (id, model) {
    thumbs.save(id, model)
        .then(function (data) {
            socket.emit('returnSave', 204, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnSave', 503);
        });
  });
  socket.on('remove', function (id) {
    thumbs.remove(id)
        .then(function (data) {
            socket.emit('returnRemove', 204, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnRemove', 503);
        });
  });
});
