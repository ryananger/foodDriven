import React, {useEffect, useState} from 'react';

import '../styles/style.css';
import st            from 'ryscott-st';
import {ax, helpers} from 'util';

import Alert   from './Alert.jsx';
import Admin   from './Admin.jsx';
import Login   from './Login.jsx';

var cookie = helpers.cookieParse();

const App = function() {
  const [user, setUser] = st.newState('user', useState(null));
  const [view, setView] = st.newState('view', useState('admin'));

  const views = {
    home: 'Home',
    admin: <Admin />,
    login: <Login />
  };

  var userFromCookie = function() {
    if (cookie.user) {
      ax.getUser(cookie.user);
    }
  };

  useEffect(userFromCookie);

  return (
    <div id='app' className='app v'>
      <Alert />
      <div className='header h'>
        <h2>foodDRIVEN</h2>
        <button onClick={()=>{setView('login')}}>login</button>
      </div>
      <div className='main v'>
        {views[view]}
      </div>
    </div>
  )
};

export default App;

