import axios from 'axios';
import st    from 'ryscott-st';

var urlBase = process.env.URL;

var ax = {
  createUser: function(user) {
    axios.post(urlBase + 'users', user)
      .then(function(response) {
        document.cookie = `user=${user.uid}`;

        st.setUser(response.data);
        st.setView('home');

        console.log('Created user in database.', response.data);
      })
  },
  getUser: function(uid, alt) {
    axios.get(urlBase + 'users/' + uid)
      .then(function(response) {
        document.cookie = `user=${uid}`;

        st.setUser(response.data);

        if (!alt) {
          st.setView('home');
        }

        console.log('Retrieved user from database.', response.data);
      })
  }
};

export default ax;
