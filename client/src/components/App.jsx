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
  const [user, setUser]         = st.newState('user', useState(null));
  const [view, setView]         = st.newState('view', useState('home'));
  const [pantries, setPantries] = st.newState('pantries', useState([]));
  const [isAdmin, setIsAdmin]   = st.newState('isAdmin', useState(''));

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

  useEffect(userFromCookie, []);
  useEffect(ax.getPantries, []);

  useEffect(function() {
    if (!user) {return;}

    if (!user.admin && !user.customerInfo) {
      setView('customerForm');
    }

    if (user.admin) {
      setIsAdmin('admin');
    }

  }, [user]);

  return (
    <div id='app' className='app v'>
      <Alert />
      <img className='bgImg' src='http://localhost:4001/public/bg.png'/>
      <div className='header h'>
        <div className='headerText h'>
          <div className='headButton v'>
            <h2 onClick={()=>{setView('home')}}>foodDRIVEN</h2>
          </div>
          <div className='headButton v'>
            <b  onClick={()=>{setView('admin')}}>{isAdmin}</b>
          </div>
        </div>
        <button onClick={handleLogin}>{user ? 'logout' : 'login'}</button>
      </div>
      <div className='main v'>
        {views[view]}
      </div>
    </div>
  )
};

export default App;

