import React, {useEffect, useState} from 'react';

import st from 'ryscott-st';
import {ax, mouse, helpers} from 'util';

import CustomerEdit from './CustomerEdit.jsx';

const CustomerEntry = function({i, customer}) {
  const [view, setView] = useState('div');

  const name = `${customer.firstName} ${customer.lastName}`;
  const mod  = i % 2 === 0 ? '' : 'light';

  var handleClick = function() {
    st.setEditing(i);

    setTimeout(function() {
      setView('edit');
    }, 0);
  };

  const entry = {
    div: (
      <div className={`customerEntry ${mod} h`} onClick={handleClick}>
        <div className='customerInfo mCol'>{customer.regId}</div>
        <div className='customerInfo mCol'>{name}</div>
        <div className='customerInfo mCol'>{helpers.renderPhone(customer.phone)}</div>
        <div className='customerInfo mCol lCol'>{customer.email}</div>
        <div className='customerInfo sCol'>{customer.zip}</div>
        <div className='customerInfo sCol'>{customer.age}</div>
        <div className='customerInfo'>{customer.ethnicity}</div>
        <div className='customerInfo sCol'>{customer.familySize}</div>
        <div className='customerInfo sCol'>{customer.numberMale}</div>
        <div className='customerInfo sCol'>{customer.numberFemale}</div>
        <div className='customerInfo sCol'>{customer.num_0to5.m + customer.num_0to5.f}</div>
        <div className='customerInfo sCol'>{customer.num_6to17.m + customer.num_6to17.f}</div>
        <div className='customerInfo sCol'>{customer.num_18to64.m + customer.num_18to64.f}</div>
        <div className='customerInfo sCol'>{customer.num_65up.m + customer.num_65up.f}</div>
        <div className='customerInfo sCol'>{customer.veterans}</div>
      </div>
    ),
    edit: (
      <CustomerEdit i={i} customer={customer} setView={setView}/>
    )
  };

  useEffect(()=>{setView('div')}, [customer]);

  return entry[view];
};

export default CustomerEntry;

