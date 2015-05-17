var ws = require('../socket').of('/locations');

var locations = require('../models/locations');

ws.on('connection', function (socket) {
  console.log('connected to locations server');

  socket.on('getSingle', function (id) {
      locations.single(id)
        .then(function (data) {
            socket.emit('single', data);
        })
        .catch(function (err) {
            console.log(err);

        });
  });
  socket.on('getCollection', function (params) {
      locations.collection(params)
        .then(function (data) {
            socket.emit('collection', data);
        })
        .catch(function () {

        });
  });
  socket.on('postCreate', function (model) {
    locations.create(model)
        .then(function (data) {
            socket.emit('create', data);
        })
        .catch(function () {

        });
  });
  socket.on('putSave', function (id, model) {
    locations.save(id, model)
        .then(function (data) {
            socket.emit('save', data);
        })
        .catch(function () {

        });
  });
  socket.on('delRemove', function (id) {
    locations.remove(model)
        .then(function (data) {
            socket.emit('remove', data);
        })
        .catch(function () {

        });
  });
});
