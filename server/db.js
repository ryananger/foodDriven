const mongoose = require('mongoose');
const url = process.env.MONGODB;
const options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.set('strictQuery', true);
mongoose.connect(url, options, function(a) {
  console.log('Connected to mongoDB.');
});

const userSchema = new mongoose.Schema({
  uid:       String, // from firebase auth
  username:  String,
  firstName: String,
  lastName:  String,

  createdOn: {type: Date, default: Date.now},

  email:     String,
  phone:     String,
  admin:     {type: Boolean, default: false}
});

const pantrySchema = new mongoose.Schema({
  ownerId:    String,
  name:       String,

  phone:      String,
  email:      String,

  address:    String,
  city:       String,
  state:      String,
  zip:        String,

  info:       Object, // contains optional info: bio and hours

  admins:    [String],
  customers: [String],
  inventory: [Object]
});

const customerSchema = new mongoose.Schema({
  uid:       String,
  regId:     String,
  firstName: String,
  lastName:  String,

  phone:     String,
  email:     String,

  address:   String,
  city:      String,
  state:     String,
  zip:       String,

  ethnicity: String,
  age:       Number,

  familySize:   {type: Number, default: 0},
  numberMale:   {type: Number, default: 0},
  numberFemale: {type: Number, default: 0},
  num_0to5:     {type: Number, default: 0},
  num_6to17:    {type: Number, default: 0},
  num_18to64:   {type: Number, default: 0},
  num_65up:     {type: Number, default: 0},

  pantries: [String]
});

const User     = new mongoose.model('User', userSchema);
const Pantry   = new mongoose.model('Pantry', pantrySchema);
const Customer = new mongoose.model('Customer', customerSchema);

var models = {
  User:     User,
  Pantry:   Pantry,
  Customer: Customer
};

module.exports = models;