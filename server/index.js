require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const router = express.Router();
const app = express();

const controller = require('./controller.js');
const dist = path.join(__dirname, '../client/dist');

router.get('/:url', function(req, res) {
  if (req.params.url === 'fix') {
    controller.fix(res);
  } else {
    res.sendFile(dist + '/index.html');
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(dist));
app.use(router);

// admin
app.post('/api/pantries', function(req, res) {
  controller.admin.createPantry(req, res);
});

app.get('/api/pantries/email/:email', function(req, res) {
  controller.admin.getPantry(req.params.email, null, res);
});

app.get('/api/pantries/email/:email/:sort', function(req, res) {
  controller.admin.getPantry(req.params.email, req.params.sort, res);
});

app.put('/api/pantries/:email', function(req, res) {
  controller.admin.editPantry(req.params.email, req.body, res);
});

app.post('/api/customers/:email', function(req, res) {
  controller.admin.addCustomer(req.params.email, req.body, res);
});

app.put('/api/customers/:regId', function(req, res) {
  controller.admin.editCustomer(req.params.regId, req.body, res);
});

// all
app.post('/api/users', function(req, res) {
  controller.createUser(req, res);
});

app.get('/api/users/:uid', function(req, res) {
  controller.getUser(req.params.uid, res);
});

app.get('/api/pantries/appts/:email', function(req, res) {
  controller.getAppointmentsForPantry(req.params.email, res);
})

app.post('/api/pantries/customer/:uid', function(req, res) {
  controller.addCustomerToPantry(req.params.uid, req.body.email, res);
});

app.get('/api/pantries', function(req, res) {
  controller.getPantries(res);
});

app.get('/api/pantries/url/:url', function(req, res) {
  controller.getPantryByURL(req.params.url, res);
});

app.put('/api/pantries/schedule/:email', function(req, res) {
  controller.scheduleCustomer(req.params.email, req.body, res);
})

app.post('/api/customers', function(req, res) {
  controller.createCustomer(req, res);
});

const PORT = 4001;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
