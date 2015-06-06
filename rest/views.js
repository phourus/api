var router = require('express').Router();
var rest = require('../rest').use('/views', router);

var views = require('../models/views');

router.get('', (req, res) => {
  let params;
  views.collection(params)
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
  //model.viewer_id = views.SESSION_USER;

  views.add(model)
  .then(function (data) {
    res.send(201, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(503);
  });
});
