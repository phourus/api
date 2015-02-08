var ws = require('../socket').of('/clout');
var clout = require('../models/clout');
var router = require('express').Router();
var rest = require('../rest').use('/clout', router);

/** WEBSOCKET IMPLEMENTATION **/
ws.on('connection', function (socket) {
  console.log('connected to clout server');
  socket.on('single', function (id) {
      clout.single(id)
        .then(function (data) {
            socket.emit('returnSingle', 200, data); 
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnSingle', 503);
        });
  });
  socket.on('collection', function (params) {
      clout.collection(params)
        .then(function (data) {
            socket.emit('returnCollection', 200, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnCollection', 503);
        });
  });
  socket.on('create', function (model) {
    clout.create(model)
        .then(function (data) {
            socket.emit('returnCreate', 201, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnCreate', 503);
        });
  });
  socket.on('save', function (id, model) {
    clout.save(id, model)
        .then(function (data) {
            socket.emit('returnSave', 204, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnSave', 503);
        });
  });
  socket.on('remove', function (id) {
    clout.remove(model)
        .then(function (data) {
            socket.emit('returnRemove', 202, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('returnRemove', 503);
        });
  });
});

/** REST IMPLEMENTATION **/
router.get('/:id', function (req, res) {
    var id = req.params.id;
    clout.single(id)
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
    clout.collection(params)
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
    clout.create(model)
        .then(function (data) {
        
        })
        .catch(function (data) {
        
        });
});
router.put('/:id', function (req, res) {
    var id = req.params.id;
    var model = {};
    clout.save(id, model)
        .then(function (data) {
            
        })
        .catch(function (data) {
            
        });
});
router.delete('/:id', function (req, res) {
    var id = req.params.id;
    clout.remove(id)
        .then(function (data) {
            
        })
        .catch(function (data) {
            
        });
});

