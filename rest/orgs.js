var router = require('express').Router();
var rest = require('../rest').use('/orgs', router);

var orgs = require('../models/orgs');

router.get('/:id', (req, res) => {
  var id;
  orgs.single(id)
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
  orgs.collection(params)
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
  orgs.create(model)
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
  orgs.save(id, model)
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
  orgs.remove(id)
  .then(function (data) {
      res.send(202, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(503);
  });
});
