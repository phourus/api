var express = require('express');
var jwt = require('express-jwt');
var rest = express();

rest.use(function (req, res) {
   jwt({secret: "123abc"}); 
});
rest.listen(4040);

module.exports = rest;