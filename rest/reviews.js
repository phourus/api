var router = require('express').Router();
var rest = require('../rest').use('/reviews', router);

var reviews = require('../models/reviews');

router.get('/:id', (req, res) => {
  var id;
  reviews.single(id)
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
  reviews.collection(params)
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
  reviews.create(model)
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
  reviews.save(id, model)
  .then(function (data) {
    res.send(204, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(503);
  });
});
router.delete('/:id', (req, res) {
  var id;
  reviews.remove(id)
  .then(function (data) {
    res.send(202, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(503);
  });
});
