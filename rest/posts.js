var router = require('express').Router();
var rest = require('../rest').use('/posts', router);

var posts = require('../models/posts');

router.get('/:id', (req, res) => {
  var id = req.params.id;
  posts.SESSION_USER = req.user_id;
  posts.single(id)
  .then(function (data) {
    res.send(200, data);
    posts.updateStats(id);
  })
  .catch(function (err) {
    console.error(err);
    res.send(503);
  });
});
router.get('', (req, res) => {
  var params = {};
  posts.collection(params)
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(503);
  });
});
router.post('', (req, res) => {
  var model = {};
  posts.add(model)
  .then(function (data) {
    res.send(201, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(503);
  });
});
router.put('/:id', (req, res) => {
  var id = req.params.id;
  var model = {};
  posts.save(id, model)
  .then(function (data) {
    res.send(204, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(503);
  });
});
router.delete('/:id', (req, res) => {
  var id = req.params.id;
  posts.remove(id)
  .then(function (data) {
    res.send(202, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(503);
  });
});
router.get('/account', (req, res) => {
   posts.account()
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(503);
  });
});
