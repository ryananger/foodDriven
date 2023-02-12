import React, {useEffect, useState} from 'react';

import '../styles/pantry.css';
import st from 'ryscott-st';
import {ax, mouse, helpers} from 'util';

const CustomerAdd = function({setAdding}) {
  const [value, setValue] = useState('');

  var handleSubmit = function(e) {
    e.preventDefault();

    var form = document.getElementById('addForm');
    var regId  = form.regId.value;
    var inputs = form.elements;
    var customer = {};

    for (var i = 1; i < inputs.length; i++) {
      var input = inputs[i];

      if (input.value) {
        var value = input.value;

        switch(input.name) {
          default:
            customer[input.name] = value;
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

            customer[input.name] = value;
            break;
          case '_name':
            var split = input.value.split(' ');
            var first = split[0];
            var last  = split[1];

            customer.firstName = first;
            customer.lastName  = last || '';
            break;
        }
      }
    }

    console.log(customer);
    setAdding(false);
    //ax.editCustomer(regId, customer, setView);
  };

  return (
    <div>
      <form id='addForm' className={`customerEditForm h`}>
        <input name='regId' className='customerEdit' value='' readOnly/>
        <input name='_name'  className='customerEdit' placeholder='Jack Johnson'/>
        <input name='phone' className='customerEdit' placeholder='555-345-1234'/>
        <input name='email' className='customerEdit lCol' placeholder='jjeats@gmail.com'/>
        <input name='zip'   className='customerEdit sCol' placeholder='90210'/>
        <input name='age'   className='customerEdit sCol' placeholder='24'/>
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
        <input name='familySize'   className='customerEdit sCol' placeholder={0}/>
        <input name='numberMale'   className='customerEdit sCol' placeholder={0}/>
        <input name='numberFemale' className='customerEdit sCol' placeholder={0}/>
        <input name='num_0to5'     className='customerEdit sCol' placeholder={0}/>
        <input name='num_6to17'    className='customerEdit sCol' placeholder={0}/>
        <input name='num_18to64'   className='customerEdit sCol' placeholder={0}/>
        <input name='num_65up'     className='customerEdit sCol' placeholder={0}/>
      </form>

      <div className='editHead h'>
        add
        <div className='h'>
          <div className='editButton h' onClick={handleSubmit}>save</div>
          <div className='editButton h' onClick={()=>{setAdding(false)}}>exit</div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAdd;

