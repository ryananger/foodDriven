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

  return (
    <div id='app' className='app v'>
      <Alert />
      <h1>
        App
      </h1>
      <div className='v'>
        <Login />
      </div>
    </div>
  )
};

export default App;

