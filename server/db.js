const mongoose = require('mongoose');
const url = process.env.MONGODB;
const options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.set('strictQuery', true);
mongoose.connect(url, options, function(a) {
  console.log('Connected to mongoDB.');
});

const userSchema = new mongoose.Schema({
  uid:          String, // from firebase auth
  username:     String,
  firstName:    String,
  lastName:     String,
  email:        String,
  phone:        String,
  admin:        Boolean
});

const pantrySchema = new mongoose.Schema({
  name:       String,
  admins:    [String],
  customers: [String],
  inventory: [Object]
});

const customerSchema = new mongoose.Schema({
  uid:       String,
  reg_id:    String,
  firstName: String,
  lastName:  String,

  phone1:    String,
  phone2:    String,
  email:     String,

  address:   String,
  city:      String,
  state:     String,
  zip:       String,

  ethnicity: String,
  age:       Number,

  familySize:   Number,
  numberMale:   Number,
  numberFemale: Number,
  num_0to5:     Number,
  num_6to17:    Number,
  num_18to64:   Number,
  num_65up:     Number
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