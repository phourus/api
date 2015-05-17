var router = require('express').Router();
var rest = require('../rest').use('/links', router);

var links = require('../models/links');

router.get('/:id', (req, res) => {
    var id;
    links.single(id)
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
    links.collection(params)
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
  links.add(model)
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
  links.save(id, model)
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
  links.remove(id)
  .then(function (data) {
      res.send(data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(503);
  });
});
