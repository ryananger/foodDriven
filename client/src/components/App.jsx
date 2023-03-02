import React, {useEffect, useState} from 'react';

import 'styles';
import st            from 'ryscott-st';
import {ax, helpers} from 'util';

import Home         from './home/Home.jsx';
import Alert        from './Alert.jsx';
import Admin        from './admin/Admin.jsx';
import Login        from './Login.jsx';
import CustomerForm from './customer/CustomerForm.jsx';

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

  var handleUser = function() {
    if (!user) {return;}

    if (!user.admin && !user.customerInfo) {
      setView('customerForm');
    }

    if (user.admin) {
      setIsAdmin('admin');
      setView('admin');
    }
  };

  useEffect(userFromCookie, []);
  useEffect(ax.getPantries, []);
  useEffect(handleUser, [user]);
  useEffect(()=>{}, [pantries]);

  return (
    <div id='app' className='app v'>
      <Alert />
      <img className='bgImg' src={process.env.URL + 'public/bg.png'}/>
      <div className='header h'>
        <div className='headerText h'>
          <div className='headButton v'>
            <h2 onClick={()=>{setView('home')}}>foodDRIVEN</h2>
          </div>
          <div className='headButton v'>
            <b onClick={()=>{setView('admin')}}>{isAdmin}</b>
          </div>
        </div>
        <button className='button' onClick={handleLogin}>{user ? 'logout' : 'login'}</button>
      </div>
      <div className='main v'>
        {views[view]}
      </div>
    </div>
  )
};

export default App;

