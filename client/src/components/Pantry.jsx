import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';

import '../styles/pantry.css';
import st            from 'ryscott-st';
import {ax, helpers} from 'util';

import CustomerEntry from './CustomerEntry.jsx';
import CustomerAdd from './CustomerAdd.jsx';

const Pantry = function() {
  const [adding, setAdding] = useState(false);
  const [data, setData] = st.newState('data', useState([]));
  const pantry = st.pantry;

  var getCustomerData = function() {
    pantry && ax.getCustomersForPantry();
  };

  var addCustomer = function() {
    var list = document.getElementById('customerData');

    list.scrollTop = 0;
    setAdding(true);
  };

  var renderData = function() {
    var rendered = [];

    if (adding) {
      rendered.push(<CustomerAdd key='add' setAdding={setAdding}/>);
    }

    data.map(function(entry, i) {
      rendered.push(<CustomerEntry key={i} i={i} customer={entry}/>);
    });

    return rendered;
  };

  useEffect(getCustomerData, [pantry]);

  return (
    <div className='pantry v'>
      <div className='pantryHead h'>
        <Plus className='icon' size={24} onClick={addCustomer}/>
      </div>
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
        <div id='customerData' className='customerData v'>
          {renderData()}
        </div>
      </div>
    </div>
  );
};

export default Pantry;

