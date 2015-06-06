var ws = require('../socket').of('/clout');

var clout = require('../models/clout');

ws.on('connection', function (socket) {
  console.log('connected to clout server');
  socket.on('getSingle', function (id) {
      clout.single(id)
        .then(function (data) {
            socket.emit('single', 200, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('single', 503);
        });
  });
  socket.on('getCollection', function (params) {
      clout.collection(params)
        .then(function (data) {
            socket.emit('collection', 200, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('collection', 503);
        });
  });
  socket.on('postCreate', function (model) {
    clout.create(model)
        .then(function (data) {
            socket.emit('create', 201, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('create', 503);
        });
  });
  socket.on('putSave', function (id, model) {
    clout.save(id, model)
        .then(function (data) {
            socket.emit('save', 204, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('save', 503);
        });
  });
  socket.on('delRemove', function (id) {
    clout.remove(model)
        .then(function (data) {
            socket.emit('remove', 202, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('remove', 503);
        });
  });
});
