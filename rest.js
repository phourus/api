var express = require('express');
var rest = express();

/** MIDDLEWARE (Sessions, JSON, BodyParser) **/

rest.listen(4040);

module.exports = rest;