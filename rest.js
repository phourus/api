var config = require("./config");
var express = require('express');
var jwt = require('jsonwebtoken');
var rest = express();

rest.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next();
});
rest.use(function (req, res, next) {
   var token = req.headers.authorization;
   // skip jwt verification if login/Basic auth
   //if (token.match(/^Basic $/)) { next(); }
   req.user_id = false;
   try {
      jwt.verify(token, config.get('salt'));
      var decoded = jwt.decode(token);
      req.user_id = decoded.user_id;
   } catch(err) {
      console.log(err);
   }
   return next();
});
rest.listen(4000);

module.exports = rest;
