import st from 'ryscott-st';
import {ax, auth} from 'util';

var helpers = {
  rand: function(num) {
    return Math.floor(Math.random() * num);
  },
  alert: function(text) {
    st.setAlerts(st.alerts + 1);
    st.setAlert(text);
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
  logOut: function() {
    document.cookie = 'user=;';
    auth.logOut();
    helpers.alert('Logout successful!');
    st.setUser(null);
    st.setView('home');
  }
};

export default helpers;