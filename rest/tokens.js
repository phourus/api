var router = require('express').Router();
var rest = require('../rest').use('/tokens', router);

var tokens = require('../models/tokens');

router.get('/:id', (req, res) => {
  let id;
  tokens.single(id)
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(503);
  });
});
router.get('', (req, res) => {
  let params;
  tokens.collection(params)
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(503);
  });
});
router.post('', (req, res) => {
  let model;
  tokens.create(model)
  .then(function (data) {
    res.send(201, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(503);
  });
});
router.put('/:id', (req, res) => {
  let id, model;
  tokens.save(id, model)
  .then(function (data) {
    res.send(204, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(503);
  });
});
router.delete('/:id', (req, res) => {
  let id;
  tokens.remove(id)
  .then(function (data) {
    res.send(202, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(503);
  });
});
