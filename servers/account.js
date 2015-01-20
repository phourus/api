var ws = require('../socket').of('/account');

var db = require('../db');
var users = require('../models/users');
var passwords = require('../models/passwords');
var jwt = require('jsonwebtoken');

//var router = require('express').Router();
//var rest = require('../rest').use('/account', router);

/** WEBSOCKET IMPLEMENTATION **/
ws.on('connection', function (socket) {
  console.log('connected to account server');
  var SESSION_USER = socket.request.user_id;

  socket.on('register', function (email, password) {           
    return db.transaction(function (t) {
      return users.create({email: email}, {transaction: t})
        .then(function (user) {
            var hash = passwords.hash(password);
            return passwords.create({user_id: user.id, hash: hash}, {transaction: t});
        });
    })
    .then(function (result) {
        console.log(result);
        socket.emit('returnRegister', 202);
    })
    .catch(function (err) {
        console.log(err);
        // duplicate email
        socket.emit('returnRegister', 409);
    });
  });
  socket.on('login', function (username, password) {
      return users.getID (username)
        .then(function (data) {
            if (data === null) {
                socket.emit('returnLogin', 0);
                //done();
            }
            return data.id;
        })
        .then(function (user_id) {
            return passwords.authorize(user_id, password)
                .then(function (data) {
                    if (data.count !== 1) {
                        console.log('user_id + hash not found');
                        return 0;
                    }
                    return user_id;
                });
        })
        .then(function (result) {
            if (result !== 0) {
                result = jwt.sign({user_id: result}, '123abc');  
            }
            socket.emit('returnLogin', result);
        })
        .catch(function (err) {
            console.log(err);
            socket.emit('returnLogin', 0);
        });  
  });
  socket.on('get', function (id, model) {
    users.single(SESSION_USER)
        .then(function (data) {
            socket.emit('returnGet', data);
        })
        .catch(function (err) {
            console.log(err);
            socket.emit('returnGet', 0);
        });
  });
  socket.on('edit', function (model) {
    users.update(model, {where: {id: SESSION_USER}})
        .then(function (data) {
            console.log(data);
            socket.emit('returnEdit', data);
        })
        .catch(function (err) {
            console.log(err);
            socket.emit('returnEdit', err);
        });
  });
  socket.on('deactivate', function () {
    users.update({status: 'closed'}, {where: {id: SESSION_USER}})
        .then(function (data) {
            socket.emit('returnDeactivate', data);
        })
        .catch(function (err) {
            console.log(err);
            socket.emit('returnDeactivate', 0);
        });
  });
  socket.on('password', function (current, changed) {
     var hash = passwords.hash(changed);
     passwords.update({hash: hash}, {where: {user_id: SESSION_USER, hash: passwords.hash(current)}})
        .then(function (data) {
            socket.emit('returnPassword', data);
        })
        .catch(function (err) {
            console.log(err);
            socket.emit('returnPassword', 0);
        });
  });
});