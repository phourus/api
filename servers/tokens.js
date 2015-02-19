var ws = require('../socket').of('/tokens');
var tokens = require('../models/tokens');
var router = require('express').Router();
var rest = require('../rest').use('/tokens', router);

/** WEBSOCKET IMPLEMENTATION **/
ws.on('connection', function (socket) {
  console.log('connected to tokens server');
  
  socket.on('getSingle', function (id) {
      tokens.single(id)
        .then(function (data) {
            socket.emit('single', data); 
        })
        .catch(function () {
            
        });
  });
  socket.on('getCollection', function (params) {
      tokens.collection(params)
        .then(function (data) {
            socket.emit('collection', data);
        })
        .catch(function () {
            
        });  
  });
  socket.on('postCreate', function (model) {
    tokens.create(model)
        .then(function (data) {
            socket.emit('create', data);
        })
        .catch(function () {
            
        }); 
  });
  socket.on('putSave', function (id, model) {
    tokens.save(id, model)
        .then(function (data) {
            socket.emit('save', data);
        })
        .catch(function () {
            
        });
  });
  socket.on('delRemove', function (id) {
    tokens.remove(model)
        .then(function (data) {
            socket.emit('remove', data);
        })
        .catch(function () {
            
        });
  });
});