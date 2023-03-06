import React, {useEffect, useState} from 'react';

import st            from 'ryscott-st';
import {ax, auth, helpers} from 'util';

import AutoAddress from './AutoAddress.jsx';

const CustomerForm = function() {
  const [value, setValue] = useState('');
  const style = value === '' ? {color: 'gray'} : {};

  var handleSubmit = function(e) {
    e.preventDefault();

    var form = e.target;
    var address = st.auto.getPlace();

    var customer = {
      uid:          st.user.uid,
      firstName:    form.firstName.value,
      lastName:     form.lastName.value,

      phone:        validPhone(form.phone.value),
      email:        validEmail(form.email.value),

      address:      address.name,
      city:         address.vicinity,
      state:        address.address_components[4].long_name,
      zip:          address.address_components[6].long_name,

      ethnicity:    form.ethnicity.value,
      age:          Number(form.age.value) || 0,

      familySize:   Number(form.familySize.value) || 0,
      numberMale:   Number(form.numberMale.value) || 0,
      numberFemale: Number(form.numberFemale.value) || 0,
      num_0to5:     helpers.strToObj(form.num_0to5.value),
      num_6to17:    helpers.strToObj(form.num_6to17.value),
      num_18to64:   helpers.strToObj(form.num_18to64.value),
      num_65up:     helpers.strToObj(form.num_65up.value),

      pantries:     [],
      appointments: []
    };

    if (customer.phone && customer.email) {
      ax.createCustomer(customer);
    }
  };

  return (
    <div className='customerCreate v'>
      <form id='customerForm' className='customerForm card v' onSubmit={handleSubmit} autoComplete='off'>
        <div className='customerFormHead v'>
          <h2>Thank you for joining foodDRIVEN!</h2>
          <div>
            We just need to collect a bit more information so we can connect you with pantries in your area.
            <br/>
            <br/>
            <small>Your information will remain private and will not be sold or distributed to third-party organizations.</small>
          </div>
        </div>
        <br/>

        <div className='customerFormBody v'>
          <small style={{alignSelf: 'flex-start'}}>*Required fields are underlined.</small>
          <div className='customerInputs v'>
            <input name='firstName'  type='text' placeholder='First name.' required/>
            <input name='lastName'   type='text' placeholder='Last name.' required/>
            <input name='email'      type='text' placeholder='Email address.' defaultValue={st.user.email} required/>
            <input name='phone'      type='text' placeholder='Phone number.' required/>
            <br/>
            <AutoAddress />
            <br/>
            <div className='customerDemo h'>
              <input name='age' type='text' placeholder='Age.' required/>
              <select name='ethnicity' value={value} style={style} onChange={(e)=>{setValue(e.target.value)}}>
                <option value='' disabled>Ethnicity.</option>
                <option value='Black'>Black</option>
                <option value='White'>White</option>
                <option value='Hispanic'>Hispanic</option>
                <option value='Asian'>Asian</option>
                <option value='Pacific Islander'>Pacific Islander</option>
                <option value='Indigenous'>Indigenous</option>
              </select>
              <input name='familySize'   type='text' placeholder='# in household.' required/>
              <input name='numberMale'   type='text' placeholder='# of Male.'/>
              <input name='numberFemale' type='text' placeholder='# of Female.'/>
            </div>
            <div className='customerDemo h'>
              <input name='num_0to5'   type='text' placeholder='# aged 0-5.'/>
              <input name='num_6to17'  type='text' placeholder='# aged 6-17.'/>
              <input name='num_18to64' type='text' placeholder='# aged 18-64.'/>
              <input name='num_65up'   type='text' placeholder='# aged 65 and up.'/>
            </div>
            <small>Input number of male and female for each, separated by a comma. (Example: 2, 1)</small>
            <br/>

            <input type='submit' value='save'/>
          </div>
        </div>
      </form>
    </div>
  )
};

var validPhone = function(str) {
  var num = str.replace(/[^a-zA-Z0-9]/g,'');

  if (Number(num) && num.length === 10) {
    return num;
  } else {
    helpers.alert('Invalid phone.');
    return false;
  }
};

var validEmail = function(str) {
  var valid = str.match(/[\w-\.]+@[\w-\.]+.[\w]/g);

  if (valid) {
    return str;
  } else {
    helpers.alert('Invalid email.');
    return false;
  }
};

export default CustomerForm;

