var ws = require('../socket').of('/posts');

var posts = require('../models/posts');

ws.on('connection', function (socket) {
  console.log('connected to posts server');
  posts.SESSION_USER = socket.request.user_id;

  socket.on('getSingle', function (id) {
      posts.single(id)
        .then(function (data) {
            socket.emit('single', 200, data);
            posts.updateStats(id);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('single', 503);
        });
  });
  socket.on('getCollection', function (params) {
      console.log(socket.request.user_id);
      posts.collection(params)
        .then(function (data) {
            socket.emit('collection', 200, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('collection', 503);
        });
  });
  socket.on('postAdd', function (model) {
    posts.add(model)
        .then(function (data) {
            console.log(data);
            socket.emit('add', 201, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('add', 503);
        });
  });
  socket.on('putSave', function (id, model) {
    posts.save(id, model)
        .then(function (data) {
            socket.emit('save', 204, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('save', 503);
        });
  });
  socket.on('delRemove', function (id) {
    posts.remove(model)
        .then(function (data) {
            socket.emit('remove', 202, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('remove', 503);
        });
  });
  socket.on('getAccount', function () {
     posts.account()
        .then(function (data) {
            socket.emit('account', 200, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('account', 503);
        });
  });
});
