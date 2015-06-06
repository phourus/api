var router = require('express').Router();
var rest = require('../rest').use('/account', router);
var config = require('../config');
var db = require('../db');
var users = require('../models/users');
var passwords = require('../models/passwords');
var posts = require('../models/posts');
var views = require('../models/views');
var comments = require('../models/comments');
var thumbs = require('../models/thumbs');
//var favs = require('../models/favs');
var jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  var email, password;
  return db.transaction(function (t) {
    return users.create({email: email}, {transaction: t})
      .then(function (user) {
          var hash = passwords.hash(password);
          return passwords.create({user_id: user.id, hash: hash}, {transaction: t});
      });
  })
  .then(function (result) {
      console.log(result);
      res.send(202);
  })
  .catch(function (err) {
      console.error(err);
      // duplicate email
      res.send(409);
  });
});
router.post('/login', (req, res) => {
    let auth = req.headers.authorization;
    let token = auth.split(' ')[1];
    let decoded = new Buffer(token, 'base64').toString().split(':');
    let username = decoded[0];
    let password = decoded[1];
    return users.getID (username)
      .then(function (data) {
          if (data === null) {
            console.error('username not found');
            res.send(404);
            //done();
          }
          return data.id;
      })
      .then(function (user_id) {
        return passwords.authorize(user_id, password)
          .then(function (data) {
            if (data.count !== 1) {
              console.error('user_id + hash not found');
              res.send(404);
            }
            return user_id;
          });
      })
      .then(function (result) {
        if (result !== 0) {
          result = jwt.sign({user_id: result}, config.get('salt'));
        }
        res.send(200, result);
      })
      .catch(function (err) {
        console.error(err);
        res.send(503);
      });
});
router.get('', (req, res) => {
  var id, model;
  users.single(SESSION_USER)
  .then(function (data) {
      res.send(200, data);
  })
  .catch(function (err) {
      console.log(err);
      res.send(503);
  });
});
router.put('', function (model) {
  users.update(model, {where: {id: SESSION_USER}})
  .then(function (data) {
      console.log(data);
      res.send(204, data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(503);
  });
});
router.delete('', function () {
  users.update({status: 'closed'}, {where: {id: SESSION_USER}})
  .then(function (data) {
      res.send(202, data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(503);
  });
});
router.put('/password', function (current, changed) {
   var hash = passwords.hash(changed);
   passwords.update({hash: hash}, {where: {user_id: SESSION_USER, hash: passwords.hash(current)}})
  .then(function (data) {
      res.send(204, data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(503);
  });
});
router.get('/notifications', function (params) {
   posts.findAll({where: {userId: SESSION_USER}})
  .then(function (data) {
      var promises = [];
      var list = [1,2,3];
      // my profile views
      promises.push(views.findAll({
          where: {userId: SESSION_USER},
          include: [
              {model: users, as: "viewer"}
          ]
      }));
      // comments on my posts
      promises.push(comments.findAll({
          where: {postId: {in: list}},
          include: [
              {model: users, as: "user"},
              {model: posts, as: "post"}
          ]
      }));
      // thumbs on my posts
      promises.push(thumbs.findAll({
          where: {postId: {in: list}},
          include: [
              {model: users, as: "user"},
              {model: posts, as: "post"}
          ]
      }));
      // those who have faved me
      //promises.push(favs.findAll({where: {to_id: SESSION_USER}));
      // ? new post by one of my favs
      return db.Promise.all(promises);
  })
  .then(function (data) {
      res.send(200, data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(503);
  });
});
router.get('/history', function (params) {
  var promises = [];
  // posts, users and orgs I've viewed
  promises.push(views.findAll({
      where: {viewerId: SESSION_USER},
      include: [
          //{model: users, as: "user"},
          {model: posts, as: "post"}
      ]
  }));
  // comments I've made
  promises.push(comments.findAll({
      where: {userId: SESSION_USER},
      include: [
          {model: posts, as: "post", include: [{model: users, as: "user"}]}
      ]
  }));
  // thumbs I gave
  promises.push(thumbs.findAll({
      where: {userId: SESSION_USER},
      include: [
          {model: posts, as: "post", include: [{model: users, as: "user"}]}
      ]
  }));
  // users I've faved
  //promises.push(favs.findAll({where: {from_id: SESSION_USER}));

  db.Promise.all(promises)
  .then(function (data) {
      res.send(200, data);
  })
  .catch(function (err) {
      console.log(err);
      res.send(503);
  });
});
