var config = require("./config");
var IO = require('socket.io');
var jwt = require('jsonwebtoken');

var server = IO.listen(config.get('port'));
server.use(function (socket, next) {
     //server.session = socket.request.cookie;
     var token = socket.handshake.query.token;
     try {
        jwt.verify(token, config.port('salt'));
        var decoded = jwt.decode(token);
        socket.request.user_id = decoded.user_id;
     } catch(err) {
        console.log(err);
        next();
     }
     return next();
});

module.exports = server;
