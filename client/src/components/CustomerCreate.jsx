import React, {useEffect, useState} from 'react';

import '../styles/pantry.css';
import st            from 'ryscott-st';
import {ax, auth, helpers} from 'util';

const CustomerCreate = function() {
  var handleSubmit = function(e) {
    e.preventDefault();

    var form = e.target;

    var customer = {
      ownerId: st.user.uid,
      name:    form.name.value,

      phone:   form.phone.value,
      email:   form.email.value,

      address: form.address.value,
      city:    form.city.value,
      state:   form.state.value,
      zip:     form.zip.value,

      info:      {},
      admins:    [st.user.uid],
      customers: [],
      inventory: []
    };

    //ax.createPantry(pantry);
  };

  var renderForm = function() {
    return (
      <form id='pantryForm' className='pantryForm v' onSubmit={handleSubmit} autoComplete='off'>
        <div className='pantryFormHead v'>
          <h2>Customer creation info!</h2>
          <div>
            Here is some info about creating your first pantry...
          </div>
        </div>
        <div className='customerCreateFormBody v'>
          <div className='customerCreateInputs v'>
            <input name='firstName'  type='text' placeholder='First name.'/>
            <input name='lastName'  type='text' placeholder='Last name.'/>
            <input name='email' type='text' placeholder='Email address.'/>
            <input name='phone' type='text' placeholder='Phone number.'/>
            <br/>
            <input name='address' type='text' placeholder='Address.'/>
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
    )
  };

  return (
    <div className='customerCreate v'>
      {renderForm()}
    </div>
  )
};

export default CustomerCreate;

