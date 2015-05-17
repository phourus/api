var ws = require('../socket').of('/members');

var members = require('../models/members');

ws.on('connection', function (socket) {
  console.log('connected to members server');

  socket.on('getSingle', function (id) {
      members.single(id)
        .then(function (data) {
            socket.emit('single', data);
        })
        .catch(function () {

        });
  });
  socket.on('getCollection', function (params) {
      members.collection(params)
        .then(function (data) {
            socket.emit('collection', data);
        })
        .catch(function () {

        });
  });
  socket.on('postCreate', function (model) {
    members.create(model)
        .then(function (data) {
            socket.emit('create', data);
        })
        .catch(function () {

        });
  });
  socket.on('putSave', function (id, model) {
    members.save(id, model)
        .then(function (data) {
            socket.emit('save', data);
        })
        .catch(function () {

        });
  });
  socket.on('delRemove', function (id) {
    members.remove(model)
        .then(function (data) {
            socket.emit('remove', data);
        })
        .catch(function () {

        });
  });
});
