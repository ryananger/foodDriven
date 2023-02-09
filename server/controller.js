const axios    = require('axios');
const { User } = require('./db.js');

var controller = {
  createUser: function(req, res) {
    User.create(req.body)
      .then(function(response) {
        var user = parseUser(response);

        res.status(201);
        res.json(user);
      })
  },
  getUser: function(uid, res) {
    User.findOne({uid: uid})
      .then(function(response) {
        var user = parseUser(response);

        res.json(user);
      })
  }
};

var parseUser = function(doc) {
  var user = {
    uid:       doc.uid,
    username:  doc.username,

    firstName: doc.firstName || null,
    lastName:  doc.lastName  || null,

    admin:     doc.admin || false
  };

  return user;
};

module.exports = controller;

