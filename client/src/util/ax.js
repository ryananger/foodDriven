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

        helpers.alert('Welcome to foodDRIVEN!');
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

        helpers.alert('Created pantry!');
        console.log('Created pantry in database.', response.data);
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
        console.log(response);
      })

  }
};

export default ax;
