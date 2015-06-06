var ws = require('../socket').of('/passwords');

var passwords = require('../models/passwords');

ws.on('connection', function (socket) {
  console.log('connected to passwords server');

  socket.on('getSingle', function (id) {
      passwords.single(id)
        .then(function (data) {
            socket.emit('single', data);
        })
        .catch(function () {

        });
  });
  socket.on('getCollection', function (params) {
      passwords.collection(params)
        .then(function (data) {
            socket.emit('collection', data);
        })
        .catch(function () {

        });
  });
  socket.on('postCreate', function (model) {
    passwords.create(model)
        .then(function (data) {
            socket.emit('create', data);
        })
        .catch(function () {

        });
  });
  socket.on('putSave', function (id, model) {
    passwords.save(id, model)
        .then(function (data) {
            socket.emit('save', data);
        })
        .catch(function () {

        });
  });
  socket.on('delRemove', function (id) {
    passwords.remove(model)
        .then(function (data) {
            socket.emit('remove', data);
        })
        .catch(function () {

        });
  });
});
