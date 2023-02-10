import React, {useEffect, useState} from 'react';

import '../styles/customerForm.css';
import st            from 'ryscott-st';
import {ax, auth, helpers} from 'util';

const CustomerForm = function() {
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
      <form id='customerForm' className='customerForm card v' onSubmit={handleSubmit} autoComplete='off'>
        <div className='customerFormHead v'>
          <h2>Thank you for joining foodDRIVEN!</h2>
          <div>
            We just need to collect some more information so we can connect you with pantries in your area.
            <br/>
            <br/>
            <small>Your information will remain private and will not be sold or distributed to third-party organizations.</small>
          </div>
        </div>
        <br/>

        <div className='customerFormBody v'>
          <div className='customerInputs v'>
            <input name='firstName'  type='text' placeholder='First name.'/>
            <input name='lastName'   type='text' placeholder='Last name.'/>
            <input name='email'      type='text' placeholder='Email address.'/>
            <input name='phone'      type='text' placeholder='Phone number.'/>
            <br/>

            <input name='address' type='text' placeholder='Address.'/>
            <div className='customerLocation h'>
              <input name='city'  type='text' placeholder='City.'/>
              <input name='state' type='text' placeholder='State.'/>
              <input name='zip'   type='text' placeholder='Zip.'/>
            </div>
            <br/>

            <div className='customerDemo h'>
              <input name='age' type='text' placeholder='Age.'/>
              <select name='ethnicity' defaultValue=''>
                <option value='' disabled>Ethnicity.</option>
              </select>
              <input name='familySize'   type='text' placeholder='# in household.'/>
              <input name='numberMale'   type='text' placeholder='# of Male.'/>
              <input name='numberFemale' type='text' placeholder='# of Female.'/>
            </div>
            <div className='customerDemo h'>
              <input name='num_0to5'   type='text' placeholder='# aged 0-5.'/>
              <input name='num_6to17'  type='text' placeholder='# aged 6-17.'/>
              <input name='num_18to64' type='text' placeholder='# aged 18-64.'/>
              <input name='num_65up'   type='text' placeholder='# aged 65 and up.'/>
            </div>
            <br/>

            <input type='submit' value='save'/>
          </div>
        </div>
      </form>
    )
  };

  return (
    <div className='customerCreate v'>
      {renderForm()}
    </div>
  )
};

export default CustomerForm;

