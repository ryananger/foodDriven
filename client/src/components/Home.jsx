import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';

import '../styles/home.css';
import st            from 'ryscott-st';
import {ax, helpers} from 'util';

const Home = function() {
  const user     = st.user;
  const pantries = st.pantries;

  var register = function(e) {
    if (!user) {return};

    var pantry = pantries[e.target.getAttribute('index')];

    ax.addCustomerToPantry(user.uid, pantry.email);
  };

  var registerButton = function(email, i) {
    var registered = false;

    st.user.pantries.map(function(pantry) {
      if (pantry.email === email) {
        registered = true;
      }
    })

    var buttons = {
      register:   <button index={i} className='register' onClick={register}>register</button>,
      registered: <div className='registered v'>registered</div>
    };

    return registered ? buttons.registered : buttons.register;
  };

  var renderPantries = function() {
    var rendered = [];

    pantries.map(function(pantry, i) {
      rendered.push(
        <div key={i} className='pantryCard h'>
          <div className='pantryCardLeft v'>
            <b>{pantry.name}</b>
          </div>
          <div className='pantryCardRight v'>
            {registerButton(pantry.email, i)}
          </div>
        </div>
      )
    })

    return rendered;
  };

  return (
    <div className='home h'>
      <div className='homeLeft card noPad v'>
        <div className='topBar h'/>
      </div>
      <div className='homeBody card noPad v'>
        <div className='topBar h'>
          {st.pantries.length}
        </div>
        <div className='cardContainer v'>
          {renderPantries()}
        </div>
      </div>
      <div className='homeRight card noPad v'>
        <div className='topBar h'/>
      </div>
    </div>
  )
};

export default Home;

