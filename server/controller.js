const axios    = require('axios');
const { User, Pantry, Customer, DbInfo } = require('./db.js');

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
  getPantry: function(email, str, res) {
    var sort = {};

    if (str) {
      var split = str.split('-');

      if (split[1] === 'asc') {
        sort[split[0]] = 1;
      } else if (split[1] === 'des') {
        sort[split[0]] = -1;
      }
    } else {
      sort = {regId: 1};
    }

    Pantry.findOne({email: email})
      .then(function(pantry) {
        controller.getCustomersForPantry(pantry, sort, res);
      })
  },
  getCustomersForPantry: function(pantry, sort, res) {
    Customer.find({pantries: pantry._id})
      .sort(sort)
      .then(function(results) {
        var customers = results.map((customer)=>{return transform(customer._doc)});

        res.json(customers);
      })
  },
  getPantryByURL: function(url, res) {
    Pantry.findOne({'info.url': url})
      .then(function(pantry) {
        res.json(pantry);
      })
  },
  addCustomerToPantry: function(uid, email, res) {
    Pantry.findOne({email: email})
      .then(function(pantry) {
        if (pantry.customers.indexOf(uid) === -1) {
          Pantry.updateOne({email: email}, {'$push': {customers: uid}})
            .then(function() {
              Customer.updateOne({uid: uid}, {'$push': {pantries: pantry._id}})
                .then(function() {
                  res.send();
                })
            })
        }
      })
  },
  getAppointmentsForPantry: function(email, res) {
    Pantry.findOne({email: email})
      .then(function(pantry) {
        var promises = [];
        var appts    = pantry.appointments;
        var updated  = {};

        for (var day in appts) {
          updated[day] = {};

          for (var timeslot in appts[day]) {
            updated[day][timeslot] = [];

            appts[day][timeslot].map(function(uid) {
              var d = day;
              var t = timeslot;

              promises.push(new Promise(function(resolve) {
                Customer.findOne({uid: uid})
                  .then(function(customer) {
                    updated[d][t].push(transform(customer._doc));
                    console.log(updated);
                    resolve();
                  })
              }))
            })
          }
        }

        Promise.all(promises)
          .then(function() {
            res.json(updated);
          })
      })
  },
  editPantry: function(email, update, res) {
    Pantry.findOneAndUpdate({email: email}, update)
      .then(function(response) {
        res.status(201);
        res.send('Edit success.');
      })
  },
  scheduleCustomer: function(email, update, res) {
    Pantry.findOne({email: email})
      .then(function(pantry) {
        console.log(email);
        var appts = {...pantry.appointments};

        for (var day in appts) {
          for (var timeslot in appts[day]) {
            var userIndex = appts[day][timeslot].indexOf(update.user);
            var updated = [];

            if (userIndex !== -1) {
              appts[day][timeslot].map(function(uid, i) {
                if (i !== userIndex) {
                  updated.push(uid);
                }
              })

              appts[day][timeslot] = updated;
            }
          }
        }

        var slot = appts[update.day][update.timeslot];

        slot.push(update.user);

        Pantry.findOneAndUpdate({email: email}, {appointments: appts})
          .then(function(response) {
            res.send();
          })
      })
  },
  createCustomer: function(req, res) {
    DbInfo.findOneAndUpdate()
      .then(function(info) {
        var str = getRegId(info.nextId);

        req.body.regId = str;
        req.body.pantries = [];

        Customer.create(req.body)
          .then(function(response) {
            var customer = transform(response._doc);

            res.status(201);
            res.json(customer);
          })

        DbInfo.findOneAndUpdate(info, {nextId: info.nextId + 1});
      })
  },
  addCustomerAdmin: function(email, customer, res) {
    DbInfo.findOneAndUpdate()
      .then(function(info) {
        var str = getRegId(info.nextId);

        customer.uid = 'temp' + str;
        customer.regId = str;
        customer.pantries = [email];

        Customer.create(customer)
          .then(function(response) {
            var customer = transform(response._doc);

            controller.addCustomerToPantry(customer.uid, email, res);
          })

        DbInfo.findOneAndUpdate(info, {nextId: info.nextId + 1});
      })
  },
  editCustomer: function(regId, update, res) {
    Customer.findOneAndUpdate({regId: regId}, update)
      .then(function(response) {
        res.status(201);
        res.send('Edit success.');
      })
  },

  connect: function(res) {
    Pantry.find()
      .then(function(pantries) {
        pantries.map(function(pantry, i) {
          pantry.customers.map(function(uid, j) {
            Customer.findOne({uid: uid})
              .then(function(customer) {
                if (customer.pantries.indexOf(pantry.email) === -1) {
                  Customer.updateOne({uid: uid}, {'$push': {pantries: pantry.email}})
                    .then(function() {
                      console.log(`Updated customer ${j} in pantry ${i}.`);
                    })
                } else {
                  console.log('Already in list.');
                }
              })
          })
        })

        res.send('Success!');
      })
  },
  fix: function(res) {
    Pantry.updateMany({}, {customers: []})
      .then(function() {
        Customer.find()
          .then(function(customers) {
            customers.map(function(customer) {
              if (customer.uid.slice(0, 4) === 'fake') {
                return;
              }

              Customer.updateOne(customer, {pantries: []})
                .then(function() {
                  console.log(customer.uid);
                })
            })
          })

        res.send('success');
      })
  }
};

var getRegId = function(num) {
  var count = '' + (num + 1);
  var year  = new Date().getFullYear();
  var str   = `${year}-${count.padStart(6, '0')}`;

  return str;
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
      .then(handleResponse);
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

const defaultInfo = {
  url: null,
  bio: null,
  appointment: null,
  register: null,
  hours: {
    m: null,
    t: null,
    w: null,
    th: null,
    f: null,
    s: null,
    sun: null
  },
  slots: {
    num: null,
    timeframe: null
  },
  open: {
    frequency: null,
    frequencyDay: null
  },
  other: null
};

module.exports = controller;