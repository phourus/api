var router = require('express').Router();
var rest = require('../rest').use('/members', router);

var members = require('../models/members');

router.get('/:id', (req, res) => {
  var id;
  members.single(id)
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
  members.collection(params)
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
  members.create(model)
  .then(function (data) {
      res.send(200, data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(503);
  });
});
router.put('/:id', (req, res) => {
  var id, model;
  members.save(id, model)
  .then(function (data) {
      res.send(200, data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(503);
  });
});
router.delete('/:id', (req, res) => {
  var id;
  members.remove(id)
  .then(function (data) {
      res.send(200, data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(503);
  });
});
