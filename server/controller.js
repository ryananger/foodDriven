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
              if (customer) {
                user.firstName = customer.firstName;
                user.lastName  = customer.lastName;

                user.customerInfo = transform(customer._doc);

                getPantriesForUser(user, res);
              } else {
                user.customerInfo = null;
                user.pantries = [];
                res.json(user);
              }
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
  getPantries: function(res) {
    Pantry.find({})
      .then(function(response) {
        var pantries = response.map(entry => transform(entry._doc));

        res.json(pantries);
      })
  },
  getPantry: function(email, res) {
    Pantry.findOne({email: email})
      .then(function(pantry) {
        controller.getCustomersForPantry(pantry, res);
      })
  },
  getCustomersForPantry: function(pantry, res) {
    var ids = pantry.customers;
    var promises  = [];
    var customers = [];

    ids.map(function(id) {
      var promise = new Promise(function(resolve) {
        Customer.findOne({uid: id})
          .then(function(result) {
            customers.push(transform(result._doc));

            resolve();
          })
      });

      promises.push(promise);
    })

    Promise.all(promises)
      .then(function() {
        res.json(customers);
      })
  },
  addCustomerToPantry: function(uid, email, res) {
    Pantry.findOne({email: email})
      .then(function(pantry) {

        if (pantry.customers.indexOf(uid) === -1) {
          Pantry.updateOne(pantry, {'$push': {customers: uid}})
            .then(function(response) {
              res.send();
            })
        }
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
  },
  addCustomerAdmin: function(email, customer, res) {
    Customer.find()
      .then(function(response) {
        var count = '' + response.length;
        var year  = new Date().getFullYear();
        var str   = `${year}-${count.padStart(6, '0')}`;

        customer.uid = 'temp' + str;
        customer.regId = str;

        Customer.create(customer)
          .then(function(response) {
            var customer = transform(response._doc);

            controller.addCustomerToPantry(customer.uid, email, res);
          })
      })
  },
  editCustomer: function(regId, update, res) {
    Customer.findOneAndUpdate({regId: regId}, update)
      .then(function(response) {
        res.status(201);
        res.send('Edit success.');
      })
  }
};

var getPantriesForUser = function(user, res) {
  var handleResponse = function(response) {
    var pantries = response.map(entry => transform(entry._doc));

    user.pantries = pantries;
    res.json(user);
  };

  if (user.admin) {
    Pantry.find({ownerId: user.uid})
      .then(handleResponse);
  } else {
    Pantry.find({customers: user.uid})
      .then(handleResponse)
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

