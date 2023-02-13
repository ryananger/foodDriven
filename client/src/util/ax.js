import axios from 'axios';
import st    from 'ryscott-st';
import {helpers} from 'util';

var urlBase = process.env.URL;

var ax = {
  createUser: function(user) {
    user.admin = st.createType === 'admin';

    axios.post(urlBase + 'users', user)
      .then(function(response) {
        document.cookie = `user=${user.uid}`;

        st.setUser(response.data);
        user.admin ? st.setView('admin') : st.setView('customerForm');

        helpers.alert('Welcome to foodDRIVEN!');
        console.log('Created user in database.', response.data);
      })
  },
  getUser: function(uid, alt) {
    axios.get(urlBase + 'users/' + uid)
      .then(function(response) {
        var user = response.data;

        st.setUser(user);
        document.cookie = `user=${uid}`;

        if (!alt) {
          user.admin ? st.setView('admin') : st.setView('home');
        }

        console.log('Retrieved user from database.', user);
      })
  },
  createPantry: function(pantry) {
    axios.post(urlBase + 'pantries/', pantry)
      .then(function(response) {
        var pantries = st.user.pantries ? [...st.user.pantries] : [];

        pantries.push(response.data);

        st.setUser({...st.user, pantries: pantries});
        st.setCreate(false);
        ax.getPantries();

        helpers.alert('Created pantry!');
        console.log('Created pantry in database.', response.data);
      })
  },
  getCustomersForPantry: function(setView) {
    const pantry = st.pantry;

    axios.get(urlBase + 'pantries/' + pantry.email)
      .then(function(response) {
        st.setData(response.data);

        if (setView) {
          setView('div');
        }
      })
  },
  getPantries: function() {
    axios.get(urlBase + 'pantries/')
      .then(function(response) {
        var pantries = response.data;

        st.setPantries(pantries);
      })
  },
  createCustomer: function(customer) {
    axios.post(urlBase + 'customers/', customer)
      .then(function(response) {
        ax.getUser(st.user.uid);
        st.setView('home');

        helpers.alert('Information saved!');
        console.log('Created customer in database.', response.data);
      })
  },
  addCustomerToPantry: function(uid, email) {
    axios.post(urlBase + 'pantries/customer/' + uid, {email: email})
      .then(function(response) {
        ax.getUser(uid);
      })
  },
  editCustomer: function(regId, update, setView) {
    axios.put(urlBase + 'customers/' + regId, update)
      .then(function(response) {
        helpers.alert('Customer information updated!');
        ax.getCustomersForPantry(setView);
      })
  },
  addCustomerAdmin: function(customer) {
    const email = st.pantry.email;

    axios.post(urlBase + 'customers/' + email, customer)
      .then(function(response) {
        helpers.alert(`Customer added to ${st.pantry.name}!`);
        ax.getCustomersForPantry();
      });
  }
};

var peopleGen = function() {
  var lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Davis',
    'Rodriquez',
    'Martinez',
    'Hernandez',
    'Moore',
    'Jackson',
    'Lee'
  ]; //13

  var firstNames = [
    'Sophia',
    'Liam',
    'Olivia',
    'Noah',
    'Riley',
    'Jackson',
    'Emma',
    'Aiden',
    'Ava',
    'Elijah',
    'Isabella',
    'Grayson',
    'Arya',
    'Peter',
    'Janine',
    'John',
    'Rebecca',
    'Steven',
    'Jennifer',
    'Michael',
    'Rachel'
  ]; //21

  var gen = function(i) {
    var uid   = 'fakeUser_' + (i + 2000).toString().padStart(6, '0');
    var first = firstNames[helpers.rand(21)];
    var last  = lastNames[helpers.rand(13)];
    var phone = helpers.rand(9000000000) + 1000000000;
    var email = `${last.toLowerCase()}.${first.toLowerCase()}.${helpers.rand(100)}@gmail.com`;
    var zip   = helpers.rand(90000) + 10000;
    var age   = helpers.rand(60) + 18;
    var size  = helpers.rand(5) + 1;

    var user = {
      uid,
      firstName: first,
      lastName: last,
      email,
      phone,
      zip,
      age,
      familySize: size
    };

    if (i > 100) {return};

    axios.post(urlBase + 'customers/', user)
      .then(function(response) {
        axios.post(urlBase + 'pantries/customer/' + user.uid, {email: 'test@test.com'})
          .then(function(response) {
            gen(i + 1);
            helpers.alert('Information saved!');
          })
      })
  };

  gen(0);
};

ax.peopleGen = peopleGen;

export default ax;
