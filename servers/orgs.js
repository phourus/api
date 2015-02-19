var ws = require('../socket').of('/orgs');
var orgs = require('../models/orgs');
var router = require('express').Router();
var rest = require('../rest').use('/orgs', router);

/** WEBSOCKET IMPLEMENTATION **/
ws.on('connection', function (socket) {
  console.log('connected to orgs server');
  
  socket.on('getSingle', function (id) {
      orgs.single(id)
        .then(function (data) {
            socket.emit('single', data); 
        })
        .catch(function () {
            
        });
  });
  socket.on('getCollection', function (params) {
      orgs.collection(params)
        .then(function (data) {
            socket.emit('collection', data);
        })
        .catch(function () {
            
        });  
  });
  socket.on('postCreate', function (model) {
    orgs.create(model)
        .then(function (data) {
            socket.emit('create', data);
        })
        .catch(function () {
            
        }); 
  });
  socket.on('putSave', function (id, model) {
    orgs.save(id, model)
        .then(function (data) {
            socket.emit('save', data);
        })
        .catch(function () {
            
        });
  });
  socket.on('delRemove', function (id) {
    orgs.remove(model)
        .then(function (data) {
            socket.emit('remove', data);
        })
        .catch(function () {
            
        });
  });
});