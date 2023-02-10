import React, {useEffect, useState} from 'react';

import '../styles/pantry.css';
import st            from 'ryscott-st';
import {ax, auth, helpers} from 'util';

const Pantry = function({create}) {

  var handleSubmit = function(e) {
    e.preventDefault();

    var form = e.target;

    console.log(form);
  };

  var renderForm = function() {
    return (
      <form id='pantryForm' className='pantryForm v' onSubmit={handleSubmit} autoComplete='off'>
        <div className='pantryFormHead v'>
          <h2>Pantry creation info!</h2>
          <div>
            Here is some info about creating your first pantry...
          </div>
        </div>
        <div className='pantryFormBody v'>
          <div className='pantryInputs v'>
            <input name='name'  type='text'     placeholder='Pantry name.'/>
            <input name='email' type='text'     placeholder='Email address.'/>
            <input name='phone' type='text'     placeholder='Phone number.'/>
            <br/>
            <input name='address' type='text'     placeholder='Pantry address.'/>
            <div className='locationInfo h'>
              <input name='city' type='text'     placeholder='City.'/>
              <input name='state' type='text'     placeholder='State.'/>
              <input name='zip' type='text'     placeholder='Zip.'/>
            </div>
            <br/>
            <input type='submit' value='save'/>
          </div>
        </div>
      </form>
    )
  };

  return (
    <div className='pantry v'>
      {create && renderForm()}
    </div>
  )
};

export default Pantry;

