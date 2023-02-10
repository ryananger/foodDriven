import React, {useEffect, useState} from 'react';

import '../styles/style.css';
import st            from 'ryscott-st';
import {ax, helpers} from 'util';

import Home         from './Home.jsx';
import Alert        from './Alert.jsx';
import Admin        from './Admin.jsx';
import Login        from './Login.jsx';
import CustomerForm from './CustomerForm.jsx';

const App = function() {
  const [user, setUser] = st.newState('user', useState(null));
  const [view, setView] = st.newState('view', useState('home'));

  const cookie = helpers.cookieParse();

  const views = {
    home:  <Home/>,
    admin: <Admin/>,
    login: <Login />,

    customerForm: <CustomerForm />
  };

  var handleLogin = function() {
    if (user) {
      helpers.logOut();
    } else {
      setView('login');
    }
  };

  var userFromCookie = function() {
    if (!user && cookie.user) {
      ax.getUser(cookie.user);
    }
  };

  useEffect(userFromCookie);

  useEffect(function() {
    if (user && !user.admin && !user.customerInfo) {
      setView('customerForm');
    }
  }, [user]);

  return (
    <div id='app' className='app v'>
      <Alert />
      <div className='header h'>
        <h2>foodDRIVEN</h2>
        <button onClick={handleLogin}>{user ? 'logout' : 'login'}</button>
      </div>
      <div className='main v'>
        {views[view]}
      </div>
    </div>
  )
};

export default App;

