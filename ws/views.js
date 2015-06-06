var ws = require('../socket').of('/views');

var views = require('../models/views');

ws.on('connection', function (socket) {
  console.log('connected to views server');
  views.SESSION_USER = socket.request.user_id;

  socket.on('getCollection', function (params) {
      views.collection(params)
        .then(function (data) {
            socket.emit('collection', data);
        })
        .catch(function (err) {
            console.error(err);
        });
  });
  socket.on('postAdd', function (model) {
    model.viewer_id = views.SESSION_USER;

    views.add(model)
        .then(function (data) {
            socket.emit('add', data);
        })
        .catch(function (err) {
            console.error(err);
        });
  });
});
