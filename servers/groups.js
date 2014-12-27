var ws = require('../socket').of('/groups');
var groups = require('../models/groups');
var router = require('express').Router();
var rest = require('../rest').use('/groups', router);

/** WEBSOCKET IMPLEMENTATION **/
ws.on('connection', function (socket) {
  console.log('connected to groups server');
  socket.on('single', function (id) {
      groups.single(id)
        .then(function (data) {
            socket.emit('returnSingle', data); 
        })
        .catch(function () {
            
        });
  });
  socket.on('collection', function (params) {
      groups.collection(params)
        .then(function (data) {
            socket.emit('returnCollection', data);
        })
        .catch(function () {
            
        });  
  });
  socket.on('create', function (model) {
    groups.create(model)
        .then(function (data) {
            socket.emit('returnCreate', data);
        })
        .catch(function () {
            
        }); 
  });
  socket.on('save', function (id, model) {
    groups.save(id, model)
        .then(function (data) {
            socket.emit('returnCreate', data);
        })
        .catch(function () {
            
        });
  });
  socket.on('remove', function (id) {
    groups.remove(model)
        .then(function (data) {
            socket.emit('returnCreate', data);
        })
        .catch(function () {
            
        });
  });
});

/** REST IMPLEMENTATION **/
router.get('/:id', function (req, res) {
    var id = req.params.id;
    groups.single(id)
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
    groups.collection(params)
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
    groups.create(model)
        .then(function (data) {
        
        })
        .catch(function (data) {
        
        });
});
router.put('/:id', function (req, res) {
    var id = req.params.id;
    var model = {};
    groups.save(id, model)
        .then(function (data) {
            
        })
        .catch(function (data) {
            
        });
});
router.delete('/:id', function (req, res) {
    var id = req.params.id;
    groups.remove(id)
        .then(function (data) {
            
        })
        .catch(function (data) {
            
        });
});

