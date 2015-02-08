var ws = require('../socket').of('/views');
var views = require('../models/views');
var router = require('express').Router();
var rest = require('../rest').use('/views', router);

/** WEBSOCKET IMPLEMENTATION **/
ws.on('connection', function (socket) {
  console.log('connected to views server');
  views.SESSION_USER = socket.request.user_id;
  
  socket.on('collection', function (params) {
      views.collection(params)
        .then(function (data) {
            socket.emit('returnCollection', data);
        })
        .catch(function (err) {
            console.error(err);
        });  
  });
  socket.on('add', function (model) {
    model.viewer_id = views.SESSION_USER;
    
    views.add(model)
        .then(function (data) {
            socket.emit('returnAdd', data);
        })
        .catch(function (err) {
            console.error(err);
        }); 
  });
});