var IO = require('socket.io');
var server = IO.listen(3000);
server.use(function (socket, next) {
     //server.session = socket.request.cookie;
     return next();
});

module.exports = server;