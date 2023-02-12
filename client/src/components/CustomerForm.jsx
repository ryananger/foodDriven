import React, {useEffect, useState} from 'react';

import '../styles/customerForm.css';
import st            from 'ryscott-st';
import {ax, auth, helpers} from 'util';

const CustomerForm = function() {
  const [value, setValue] = useState('');
  const style = value === '' ? {color: 'gray'} : {};

  var handleSubmit = function(e) {
    e.preventDefault();

    var form = e.target;

    var customer = {
      uid:          st.user.uid,
      firstName:    form.firstName.value,
      lastName:     form.lastName.value,

      phone:        form.phone.value,
      email:        form.email.value,

      address:      form.address.value,
      city:         form.city.value,
      state:        form.state.value,
      zip:          form.zip.value,

      ethnicity:    form.ethnicity.value,
      age:          form.age.value,

      familySize:   form.familySize.value,
      numberMale:   form.numberMale.value || 0,
      numberFemale: form.numberFemale.value || 0,
      num_0to5:     form.num_0to5.value || 0,
      num_6to17:    form.num_6to17.value || 0,
      num_18to64:   form.num_18to64.value || 0,
      num_65up:     form.num_65up.value || 0,
    };

    ax.createCustomer(customer);
  };

  var renderForm = function() {
    return (
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

            <input name='address' type='text' placeholder='Address.' required/>
            <div className='customerLocation h'>
              <input name='city'  type='text' placeholder='City.' required/>
              <input name='state' type='text' placeholder='State.' required/>
              <input name='zip'   type='text' placeholder='Zip.' required/>
            </div>
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

