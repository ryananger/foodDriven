const axios    = require('axios');
const { User, Pantry, Customer } = require('./db.js');

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

        if (!user.admin) {
          Customer.findOne({uid: uid})
            .then(function(customer) {
              user.customerInfo = customer ? transform(customer._doc) : null;

              getPantriesForUser(user, res);
            })
        } else {
          getPantriesForUser(user, res);
        }
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
  },
  createCustomer: function(req, res) {
    Customer.find()
      .then(function(response) {
        var count = '' + response.length;
        var year  = new Date().getFullYear();
        var str   = `${year}-${count.padStart(6, '0')}`;

        req.body.regId = str;

        Customer.create(req.body)
          .then(function(response) {
            var customer = transform(response._doc);

            res.status(201);
            res.json(customer);
          })
      })
  }
};

var getPantriesForUser = function(user, res) {
  if (user.admin) {
    Pantry.find({ownerId: user.uid})
      .then(function(response) {
        var pantries = response.map(entry => transform(entry._doc));

        console.log(user);
        user.pantries = pantries;
        res.json(user);
      })
  } else {
    Pantry.find({customers: user.uid})
      .then(function(response) {
        var pantries = response.map(entry => transform(entry._doc));

        console.log(user);
        user.pantries = pantries;
        res.json(user);
      })
  }
};

var parseUser = function(doc) {
  var user = {
    uid:       doc.uid,
    username:  doc.username,
    email:     doc.email,

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

