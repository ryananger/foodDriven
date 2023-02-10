import React, {useEffect, useState} from 'react';

import '../styles/login.css';
import st            from 'ryscott-st';
import {ax, auth, helpers} from 'util';

const Login = function() {
  const [signUp, setSignUp] = useState(false);
  const [createType, setCreateType] = st.newState('createType', useState(''));

  var handleSubmit = function(e) {
    e.preventDefault();

    var form = e.target;

    if (signUp) {
      var user = {
        username: form.username.value,
        email: form.email.value,
        password: form.pass.value
      };

      auth.signUp(user);
    } else {
      auth.signIn(form.email.value, form.pass.value);
    }
  };

  var typeButton = function(type) {
    var mod = createType === type ? 'selected' : '';
    var dir = type === 'admin' ? 'left' : 'right';
    var text = type === 'admin' ? 'Provider' : 'Customer';

    var handleClick = function(e) {
      e.preventDefault();

      setCreateType(type);
    };

    return <button className={`createType ${dir} ${mod}`} onClick={handleClick}>{text}</button>;
  };

  var signUpDiv = function() {
    return (
      <>
      <b style={{fontSize: '18px'}}>I am a...</b>
      <div className='signUpButtons h'>
        {typeButton('admin')}
        {typeButton('customer')}
      </div>
      <input name='username' autoComplete='off' type='text' placeholder='Username?'/>
      </>
    )
  };

  var renderForm = function() {
    return (
      <form id='loginForm' className='loginForm v' onSubmit={handleSubmit} autoComplete='off'>
        <div className='formHead v'>
          <h2>
            Welcome to foodDriven!
          </h2>
        </div>

        <div className='formBody v'>
          <div className='loginInputs v'>
            {signUp && signUpDiv()}

            <input name='email' autoComplete='off' type='text'     placeholder='Email address!'/>
            <input name='pass'  autoComplete='off' type='password' placeholder='Password!'/>
            <input type='submit' value={!signUp ? 'sign in' : 'sign up'}/>
          </div>

          <div className='signUpText' onClick={()=>{setSignUp(!signUp)}}>
            {!signUp && 'Create an account?'}
            {signUp  && 'Sign in?'}
          </div>
        </div>

        <div className='backButton' onClick={()=>{st.setView('home')}}>
          back
        </div>
      </form>
    )
  };

  return (
    <div className='auth v'>
      {renderForm()}
    </div>
  )
};

export default Login;

