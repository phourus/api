var router = require('express').Router();
var rest = require('../rest').use('/locations', router);

var locations = require('../models/locations');

router.get('/:id', (req, res) => {
  var id;
  locations.single(id)
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
  locations.collection(params)
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
  locations.create(model)
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
  locations.save(id, model)
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
  locations.remove(model)
  .then(function (data) {
      res.send(200, data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(503);
  });
});
