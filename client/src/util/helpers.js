import st from 'ryscott-st';
import {ax, auth} from 'util';

var helpers = {
  rand: function(num) {
    return Math.floor(Math.random() * num);
  },
  cookieParse: function() {
    var split = document.cookie.replaceAll(' ', '').split(';');
    var cookie = {};

    if (!split[0]) {
      cookie = 'No cookie.'
    } else {
      split.map(function(entry) {
        var pair = entry.split('=');

        cookie[pair[0]] = pair[1];
      })
    }

    return cookie;
  },
  alert: function(text) {
    st.setAlerts(st.alerts + 1);
    st.setAlert(text);
  },
  logOut: function() {
    document.cookie = 'user=;';
    auth.logOut();
    helpers.alert('Logout successful!');
    st.setUser(null);
    st.setIsAdmin('');
    st.setView('home');
  }
};

export default helpers;