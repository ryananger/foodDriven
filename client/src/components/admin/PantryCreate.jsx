import React, {useEffect, useState} from 'react';

import st            from 'ryscott-st';
import {ax, auth, helpers} from 'util';

const PantryCreate = function() {
  const info = {
    url: null,
    bio: null,
    appointment: 'no',
    register: 'yes',
    hours: {
      m: null,
      t: null,
      w: null,
      th: null,
      f: null,
      s: null,
      sun: null
    },
    slots: {
      num: null,
      timeframe: null
    },
    open: {
      frequency: null,
      day: null
    },
    other: null
  };

  var handleSubmit = function(e) {
    e.preventDefault();

    var form = e.target;

    var pantry = {
      ownerId: st.user.uid,
      name:    form.name.value,

      phone:   form.phone.value,
      email:   form.email.value,

      address: form.address.value,
      city:    form.city.value,
      state:   form.state.value,
      zip:     form.zip.value,

      info:         info,
      admins:       [st.user.uid],
      customers:    [],
      appointments: [],
      inventory:    []
    };

    ax.createPantry(pantry);
  };

  return (
    <div className='pantry v'>
      <form id='pantryForm' className='pantryForm v' onSubmit={handleSubmit} autoComplete='off'>
        <div className='pantryFormHead v'>
          <h2>Pantry creation info!</h2>
          <div>
            Here is some info about creating your first pantry...
          </div>
        </div>
        <div className='pantryFormBody v'>
          <div className='pantryInputs v'>
            <input name='name'  type='text' placeholder='Pantry name.'/>
            <input name='email' type='text' placeholder='Email address.'/>
            <input name='phone' type='text' placeholder='Phone number.'/>
            <br/>
            <input name='address' type='text' placeholder='Pantry address.'/>
            <div className='locationInfo h'>
              <input name='city'  type='text' placeholder='City.'/>
              <input name='state' type='text' placeholder='State.'/>
              <input name='zip'   type='text' placeholder='Zip.'/>
            </div>
            <br/>
            <input type='submit' value='save'/>
          </div>
        </div>
        <br/>
        <div className='backButton' onClick={()=>{st.setCreate(false)}}>back</div>
      </form>
    </div>
  )
};

export default PantryCreate;

