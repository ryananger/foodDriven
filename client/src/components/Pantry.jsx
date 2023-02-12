import React, {useEffect, useState} from 'react';

import '../styles/pantry.css';
import st            from 'ryscott-st';
import {ax, helpers} from 'util';

import CustomerEntry from './CustomerEntry.jsx';

const Pantry = function() {
  const [data, setData] = st.newState('data', useState([]));
  const pantry = st.pantry;

  var getCustomerData = function() {
    pantry && ax.getCustomersForPantry();
  };

  var renderData = function() {
    var rendered = data.map((entry, i)=>{return <CustomerEntry key={i} i={i} customer={entry}/>});

    return rendered;
  };

  useEffect(getCustomerData, [pantry]);

  return (
    <div className='pantry v'>
      <div className='customerList v'>
        <div className='customerLabels h'>
          <div className='customerLabel'>#</div>
          <div className='customerLabel'>name</div>
          <div className='customerLabel'>phone</div>
          <div className='customerLabel lCol'>email</div>
          <div className='customerLabel sCol'>zip</div>
          <div className='customerLabel sCol'>age</div>
          <div className='customerLabel'>ethnicity</div>
          <div className='customerLabel sCol'>size</div>
          <div className='customerLabel sCol'>M</div>
          <div className='customerLabel sCol'>F</div>
          <div className='customerLabel sCol'>0-6</div>
          <div className='customerLabel sCol'>6-17</div>
          <div className='customerLabel sCol'>18-64</div>
          <div className='customerLabel sCol'>65+</div>
        </div>
        <div className='customerData v'>
          {renderData()}
        </div>
      </div>
    </div>
  );
};

export default Pantry;

