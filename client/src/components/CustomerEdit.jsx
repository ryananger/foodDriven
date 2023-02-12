import React, {useEffect, useState} from 'react';

import '../styles/pantry.css';
import st from 'ryscott-st';
import {ax, mouse, helpers} from 'util';

const CustomerEdit = function({customer, setView}) {
  const [value, setValue] = useState(customer.ethnicity);

  const name = `${customer.firstName} ${customer.lastName}`;

  var handleSubmit = function(e) {
    e.preventDefault();

    var form = document.getElementById('editForm');
    var regId  = form.regId.value;
    var inputs = form.elements;
    var update = {};

    for (var i = 1; i < inputs.length; i++) {
      var input = inputs[i];

      if (input.value) {
        var value = input.value;

        switch(input.name) {
          default:
            update[input.name] = value;
            break;
          case 'age':
          case 'familySize':
          case 'numberMale':
          case 'numberFemale':
          case 'num_0to5':
          case 'num_6to17':
          case 'num_18to64':
          case 'num_65up':
            value = Number(value);

            update[input.name] = value;
            break;
          case '_name':
            var split = input.value.split(' ');
            var first = split[0];
            var last  = split[1];

            update.firstName = first;
            update.lastName  = last || '';
            break;
        }
      }
    }

    ax.editCustomer(regId, update, setView);
  };

  return (
    <div>
      <form id='editForm' className={`customerEditForm h`}>
        <input name='regId' className='customerEdit' value={customer.regId} readOnly/>
        <input name='_name'  className='customerEdit' placeholder={name}/>
        <input name='phone' className='customerEdit' placeholder={helpers.renderPhone(customer.phone)}/>
        <input name='email' className='customerEdit lCol' placeholder={customer.email}/>
        <input name='zip'   className='customerEdit sCol' placeholder={customer.zip}/>
        <input name='age'   className='customerEdit sCol' placeholder={customer.age}/>
        <div className='customerEdit'>
          <select className='editSelect' name='ethnicity' value={value} onChange={(e)=>{setValue(e.target.value)}}>
            <option value='' disabled>Ethnicity.</option>
            <option value='Black'>Black</option>
            <option value='White'>White</option>
            <option value='Hispanic'>Hispanic</option>
            <option value='Asian'>Asian</option>
            <option value='Pacific Islander'>Pacific Islander</option>
            <option value='Indigenous'>Indigenous</option>
          </select>
        </div>
        <input name='familySize'   className='customerEdit sCol' placeholder={customer.familySize}/>
        <input name='numberMale'   className='customerEdit sCol' placeholder={customer.numberMale}/>
        <input name='numberFemale' className='customerEdit sCol' placeholder={customer.numberFemale}/>
        <input name='num_0to5'     className='customerEdit sCol' placeholder={customer.num_0to5}/>
        <input name='num_6to17'    className='customerEdit sCol' placeholder={customer.num_6to17}/>
        <input name='num_18to64'   className='customerEdit sCol' placeholder={customer.num_18to64}/>
        <input name='num_65up'     className='customerEdit sCol' placeholder={customer.num_65up}/>
      </form>

      <div className='editHead h'>
        edit
        <div className='h'>
          <div className='editButton h' onClick={handleSubmit}>save</div>
          <div className='editButton h' onClick={()=>{setView('div')}}>exit</div>
        </div>
      </div>
    </div>
  );
};

export default CustomerEdit;

