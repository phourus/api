var router = require('express').Router();
var rest = require('../rest').use('/clout', router);

var clout = require('../models/clout');


router.get('/:id', (req, res) => {
    var id;
    clout.single(id)
    .then(function (data) {
        res.send(200, data);
    })
    .catch(function (err) {
        console.error(err);
        res.send(503);
    });
});
router.get('', (req, res) => {
    var params;
    clout.collection(params)
    .then(function (data) {
        res.send(200, data);
    })
    .catch(function (err) {
        console.error(err);
        res.send(503);
    });
});
router.post('', (req, res) => {
  var model;
  clout.create(model)
  .then(function (data) {
      res.send(201, data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(503);
  });
});
router.put('/:id', (req, res) => {
  var id, model;
  clout.save(id, model)
  .then(function (data) {
      res.send(204, data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(503);
  });
});
router.delete('/:id', (req, res) => {
  var id;
  clout.remove(id)
  .then(function (data) {
      res.send(202, data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(503);
  });
});
