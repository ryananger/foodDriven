require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const controller = require('./controller.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.post('/users', function(req, res) {
  controller.createUser(req, res);
});

app.get('/users/:uid', function(req, res) {
  controller.getUser(req.params.uid, res);
});

app.post('/pantries', function(req, res) {
  controller.createPantry(req, res);
});

app.get('/pantries/:email', function(req, res) {
  controller.getPantry(req.params.email, null, res);
});

app.get('/pantries/:email/:sort', function(req, res) {
  controller.getPantry(req.params.email, req.params.sort, res);
});

app.post('/pantries/customer/:uid', function(req, res) {
  controller.addCustomerToPantry(req.params.uid, req.body.email, res);
});

app.get('/pantries', function(req, res) {
  controller.getPantries(res);
});

app.put('/pantries/:email', function(req, res) {
  controller.editPantry(req.params.email, req.body, res);
});

app.post('/customers', function(req, res) {
  controller.createCustomer(req, res);
});

app.post('/customers/:email', function(req, res) {
  controller.addCustomerAdmin(req.params.email, req.body, res);
});

app.put('/customers/:regId', function(req, res) {
  controller.editCustomer(req.params.regId, req.body, res);
});

app.get('/connect', function(req, res) {
  controller.connect(res);
})

app.get('/fix', function(req, res) {
  controller.fix(res);
})

const PORT = 4001;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
