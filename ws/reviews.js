var ws = require('../socket').of('/reviews');

var reviews = require('../models/reviews');

ws.on('connection', function (socket) {
  console.log('connected to reviews server');

  socket.on('getSingle', function (id) {
      reviews.single(id)
        .then(function (data) {
            socket.emit('single', data);
        })
        .catch(function () {

        });
  });
  socket.on('getCollection', function (params) {
      reviews.collection(params)
        .then(function (data) {
            socket.emit('collection', data);
        })
        .catch(function () {

        });
  });
  socket.on('postCreate', function (model) {
    reviews.create(model)
        .then(function (data) {
            socket.emit('create', data);
        })
        .catch(function () {

        });
  });
  socket.on('putSave', function (id, model) {
    reviews.save(id, model)
        .then(function (data) {
            socket.emit('save', data);
        })
        .catch(function () {

        });
  });
  socket.on('delRemove', function (id) {
    reviews.remove(model)
        .then(function (data) {
            socket.emit('remove', data);
        })
        .catch(function () {

        });
  });
});
