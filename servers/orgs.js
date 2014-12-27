var ws = require('../socket').of('/orgs');
var orgs = require('../models/orgs');
var router = require('express').Router();
var rest = require('../rest').use('/orgs', router);

/** WEBSOCKET IMPLEMENTATION **/
ws.on('connection', function (socket) {
  console.log('connected to orgs server');
  socket.on('single', function (id) {
      orgs.single(id)
        .then(function (data) {
            socket.emit('returnSingle', data); 
        })
        .catch(function () {
            
        });
  });
  socket.on('collection', function (params) {
      orgs.collection(params)
        .then(function (data) {
            socket.emit('returnCollection', data);
        })
        .catch(function () {
            
        });  
  });
  socket.on('create', function (model) {
    orgs.create(model)
        .then(function (data) {
            socket.emit('returnCreate', data);
        })
        .catch(function () {
            
        }); 
  });
  socket.on('save', function (id, model) {
    orgs.save(id, model)
        .then(function (data) {
            socket.emit('returnCreate', data);
        })
        .catch(function () {
            
        });
  });
  socket.on('remove', function (id) {
    orgs.remove(model)
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
    orgs.single(id)
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
    orgs.collection(params)
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
    orgs.create(model)
        .then(function (data) {
        
        })
        .catch(function (data) {
        
        });
});
router.put('/:id', function (req, res) {
    var id = req.params.id;
    var model = {};
    orgs.save(id, model)
        .then(function (data) {
            
        })
        .catch(function (data) {
            
        });
});
router.delete('/:id', function (req, res) {
    var id = req.params.id;
    orgs.remove(id)
        .then(function (data) {
            
        })
        .catch(function (data) {
            
        });
});

