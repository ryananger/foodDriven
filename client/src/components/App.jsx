import React, {useEffect, useState} from 'react';

import '../styles/style.css';
import st            from 'ryscott-st';
import {ax, helpers} from 'util';

import Alert   from './Alert.jsx';
import Login   from './Login.jsx';

var cookie = helpers.cookieParse();

const App = function() {
  const [user, setUser] = st.newState('user', useState(null));
  const [view, setView] = st.newState('view', useState('home'));

  const views = {
    home: 'Home',
    login: <Login />
  };

  return (
    <div id='app' className='app v'>
      <Alert />
      <div className='header h'>
        <h2>foodDriven</h2>
        <button onClick={()=>{setView('login')}}>login</button>
      </div>
      <div className='main v'>
        {views[view]}
      </div>
    </div>
  )
};

export default App;

