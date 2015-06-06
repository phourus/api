var ws = require('../socket').of('/links');

var links = require('../models/links');

ws.on('connection', function (socket) {
  console.log('connected to links server');
  socket.on('getSingle', function (id) {
      links.single(id)
        .then(function (data) {
            socket.emit('single', data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('single', 503);
        });
  });
  socket.on('getCollection', function (params) {
      links.collection(params)
        .then(function (data) {
            socket.emit('collection', data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('collection', 503);
        });
  });
  socket.on('postAdd', function (model) {
    links.add(model)
        .then(function (data) {
            socket.emit('add', data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('add', 503);
        });
  });
  socket.on('putSave', function (id, model) {
    links.save(id, model)
        .then(function (data) {
            socket.emit('save', data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('save', 503);
        });
  });
  socket.on('delRemove', function (id) {
    links.remove(id)
        .then(function (data) {
            socket.emit('remove', data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('remove', 503);
        });
  });
});
