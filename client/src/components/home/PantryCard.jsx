import React, {useEffect, useState} from 'react';
import {IoMdMail as Mail} from 'react-icons/io';
import {AiFillPhone as Phone} from 'react-icons/ai';

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
      <div className='pantryCardLeft h'>
        <img className='pantryImage pantryThumb' src={process.env.URL + 'public/thumb.jpg'}/>
        <div className='v' style={{alignItems: 'flex-start'}}>
          <div><h3>{pantry.name}</h3></div>
          <div>{pantry.email}</div>
          <div>{helpers.renderPhone(pantry.phone)}</div>
          <br/>
          <div>{pantry.address}</div>
          <div>{pantry.city}, {helpers.abbrState(pantry.state, 'abbr')} {pantry.zip}</div>
        </div>
      </div>
      <div className='pantryCardRight v'>
        {user && user.customerInfo && registerButton()}
      </div>
    </div>
  )
};

export default PantryCard;

