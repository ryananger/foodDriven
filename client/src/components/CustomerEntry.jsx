import React, {useEffect, useState} from 'react';

import '../styles/pantry.css';
import st from 'ryscott-st';
import {ax, mouse, helpers} from 'util';

import CustomerEdit from './CustomerEdit.jsx';

const CustomerEntry = function({i, customer}) {
  const [view, setView] = useState('div');

  const name = `${customer.firstName} ${customer.lastName}`;
  const mod  = i % 2 === 0 ? '' : 'light';

  var handleClick = function() {
    setView('edit');
  };

  const entry = {
    div: (
      <div className={`customerEntry ${mod} h`} onClick={handleClick}>
        <div className='customerInfo'>{customer.regId}</div>
        <div className='customerInfo'>{name}</div>
        <div className='customerInfo'>{helpers.renderPhone(customer.phone)}</div>
        <div className='customerInfo lCol'><small>{customer.email}</small></div>
        <div className='customerInfo sCol'>{customer.zip}</div>
        <div className='customerInfo sCol'>{customer.age}</div>
        <div className='customerInfo'>{customer.ethnicity}</div>
        <div className='customerInfo sCol'>{customer.familySize}</div>
        <div className='customerInfo sCol'>{customer.numberMale}</div>
        <div className='customerInfo sCol'>{customer.numberFemale}</div>
        <div className='customerInfo sCol'>{customer.num_0to5}</div>
        <div className='customerInfo sCol'>{customer.num_6to17}</div>
        <div className='customerInfo sCol'>{customer.num_18to64}</div>
        <div className='customerInfo sCol'>{customer.num_65up}</div>
      </div>
    ),
    edit: (
      <CustomerEdit customer={customer} setView={setView}/>
    )
  };

  return entry[view];
};

export default CustomerEntry;

