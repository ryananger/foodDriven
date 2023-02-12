import React, {useEffect, useState} from 'react';

import '../styles/pantry.css';
import st from 'ryscott-st';
import {ax, mouse, helpers} from 'util';

const CustomerEdit = function({customer, setView}) {
  const [value, setValue] = useState(customer.ethnicity);

  const name = `${customer.firstName} ${customer.lastName}`;

  return (
    <div>
      <div className='editHead h'>
        edit
        <div className='h'>
          <div className='editButton h'>save</div>
          <div className='editButton h' onClick={()=>{setView('div')}}>exit</div>
        </div>
      </div>

      <form className={`customerEditForm h`}>
        <input className='customerEdit' value={customer.regId} readOnly/>
        <input className='customerEdit' placeholder={name}/>
        <input className='customerEdit' placeholder={helpers.renderPhone(customer.phone)}/>
        <input className='customerEdit lCol' placeholder={customer.email}/>
        <input className='customerEdit sCol' placeholder={customer.zip}/>
        <input className='customerEdit sCol' placeholder={customer.age}/>
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

        <input className='customerEdit sCol' placeholder={customer.familySize}/>
        <input className='customerEdit sCol' placeholder={customer.numberMale}/>
        <input className='customerEdit sCol' placeholder={customer.numberFemale}/>
        <input className='customerEdit sCol' placeholder={customer.num_0to5}/>
        <input className='customerEdit sCol' placeholder={customer.num_6to17}/>
        <input className='customerEdit sCol' placeholder={customer.num_18to64}/>
        <input className='customerEdit sCol' placeholder={customer.num_65up}/>
      </form>
    </div>
  );
};

export default CustomerEdit;

