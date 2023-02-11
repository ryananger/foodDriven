import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';

import '../styles/home.css';
import st            from 'ryscott-st';
import {ax, helpers} from 'util';

const PantryCard = function({pantry, index}) {
  const [registered, setRegistered] = useState(false);

  const user     = st.user;
  const pantries = st.pantries;

  var register = function() {
    setRegistered(true);
    ax.addCustomerToPantry(user.uid, pantry.email);
  };

  var registerButton = function() {
    var buttons = {
      register:   <button className='register' onClick={register}>register</button>,
      registered: <div className='registered v'>registered</div>
    };

    return registered ? buttons.registered : buttons.register;
  };

  useEffect(()=>{
    if (!user) {return};

    user.pantries.map(function(entry) {
      if (entry.email === pantry.email) {
        setRegistered(true);
      }
    })
  }, []);

  return (
    <div className='pantryCard h'>
      <div className='pantryCardLeft v'>
        <b>{pantry.name}</b>
      </div>
      <div className='pantryCardRight v'>
        {user && registerButton()}
      </div>
    </div>
  )
};

export default PantryCard;

