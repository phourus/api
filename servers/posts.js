var ws = require('../socket').of('/posts');
var posts = require('../models/posts');
var router = require('express').Router();
var rest = require('../rest').use('/posts', router);

/** WEBSOCKET IMPLEMENTATION **/
ws.on('connection', function (socket) {
  console.log('connected to posts server');
  posts.SESSION_USER = socket.request.user_id;
  
  socket.on('single', function (id) {
      posts.single(id)
        .then(function (data) {
            socket.emit('returnSingle', data); 
        })
        .catch(function () {
            
        });
  });
  socket.on('collection', function (params) {
      console.log(socket.request.user_id);
      posts.collection(params)
        .then(function (data) {
            socket.emit('returnCollection', data);
        })
        .catch(function () {
            
        });  
  });
  socket.on('add', function (model) {
    posts.add(model)
        .then(function (data) {
            console.log(data);
            socket.emit('returnAdd', data);
        })
        .catch(function (err) {
            console.log(err);
        }); 
  });
  socket.on('save', function (id, model) {
    posts.save(id, model)
        .then(function (data) {
            socket.emit('returnSave', data);
        })
        .catch(function (err) {
        
        });
  });
  socket.on('remove', function (id) {
    posts.remove(model)
        .then(function (data) {
            socket.emit('returnCreate', data);
        })
        .catch(function () {
            
        });
  });
  socket.on('account', function () {
     posts.account() 
        .then(function (data) {
            socket.emit('returnAccount', data);
        })
        .catch(function (err) {
            console.log(err);
        });
  });
});

/** REST IMPLEMENTATION **/
router.get('/:id', function (req, res) {
    var id = req.params.id;
    posts.single(id)
        .then(function (data) {
            console.log(data);
            res.json(200, data);
        })
        .catch(function (data) {
           console.log('ERR: ' + data); 
           res.json(503);
        });
});
router.get('', function (req, res) {
    var params = req.query;
    posts.collection(params)
        .then(function (data) {
            res.json(200, data);
        })
        .catch(function (data) {
            console.log('ERR: ' + data);
            res.json(503);
        });
});
router.post('/', function (req, res) {
    var model = {};
    posts.create(model)
        .then(function (data) {
        
        })
        .catch(function (data) {
        
        });
});
router.put('/:id', function (req, res) {
    var id = req.params.id;
    var model = {};
    posts.save(id, model)
        .then(function (data) {
            
        })
        .catch(function (data) {
            
        });
});
router.delete('/:id', function (req, res) {
    var id = req.params.id;
    posts.remove(id)
        .then(function (data) {
            
        })
        .catch(function (data) {
            
        });
});

