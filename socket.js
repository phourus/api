var IO = require('socket.io');
var jwt = require('jsonwebtoken');

var server = IO.listen(3000);
server.use(function (socket, next) {
     //server.session = socket.request.cookie;
     var token = socket.handshake.query.token;
     try {
        jwt.verify(token, '123abc');
        var decoded = jwt.decode(token);
        socket.request.user_id = decoded.user_id;
     } catch(err) {
        console.log(err);
        next();
     }
     return next();
});

module.exports = server; 