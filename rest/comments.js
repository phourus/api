var router = require('express').Router();
var rest = require('../rest').use('/comments', router);

var comments = require('../models/comments');

router.get('', (req, res) => {
  var params;
  comments.collection(params)
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
  comments.add(model)
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
  comments.save(id, model)
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
  comments.remove(id)
  .then(function (data) {
      res.send(204, data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(503);
  });
});
