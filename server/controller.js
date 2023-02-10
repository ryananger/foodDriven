const axios    = require('axios');
const { User, Pantry } = require('./db.js');

var controller = {
  createUser: function(req, res) {
    User.create(req.body)
      .then(function(response) {
        var user = parseUser(response);

        user.pantries = [];

        res.status(201);
        res.json(user);
      })
  },
  getUser: function(uid, res) {
    User.findOne({uid: uid})
      .then(function(response) {
        var user = parseUser(response);

        getPantriesForUser(user, res);
      })
  },
  createPantry: function(req, res) {
    Pantry.create(req.body)
      .then(function(response) {
        var pantry = transform(response._doc);

        res.status(201);
        res.json(pantry);
      })
  },
  getPantries: function(uid, res) {
    Pantry.find({})
      .then(function(response) {
        var pantries = response.map(entry => transform(entry._doc));

        res.json(pantries);
      })
  }
};

var getPantriesForUser = function(user, res) {
  if (user.admin) {
    Pantry.find({ownerId: user.uid})
      .then(function(response) {
        var pantries = response.map(entry => transform(entry._doc));

        user.pantries = pantries;
        res.json(user);
      })
  } else {
    Pantry.find({customers: user.uid})
      .then(function(response) {
        var pantries = response.map(entry => transform(entry._doc));

        user.pantries = pantries;
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

var transform = function(doc) {
  var newDoc = {};

  for (var key in doc) {
    if (key !== '__v' && key !== '_id') {
      newDoc[key] = doc[key];
    }
  }

  return newDoc;
};

module.exports = controller;

