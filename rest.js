var config = require("./config");
var express = require('express');
var jwt = require('express-jwt');
var rest = express();

rest.use(function (req, res) {
   jwt({secret: config.get('salt')});
});
rest.listen(8082);

module.exports = rest;
