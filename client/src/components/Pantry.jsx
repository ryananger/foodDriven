import React, {useEffect, useState} from 'react';

import '../styles/pantry.css';
import st            from 'ryscott-st';
import {ax, auth, helpers} from 'util';

const Pantry = function({pantry}) {
  const [data, setData] = useState([]);

  var getCustomerData = function(e) {
    if (!pantry) {return};

    ax.getCustomersForPantry(pantry, setData);
  };

  var renderData = function() {
    var rendered = [];

    data.map(function(entry, i) {
      var mod = i % 2 === 0 ? '' : 'light';

      rendered.push(
        <div key={i} className={`customerEntry ${mod} h`}>
          <div className='customerInfo'>{entry.regId}</div>
          <div className='customerInfo'>{`${entry.firstName} ${entry.lastName}`}</div>
          <div className='customerInfo'>{helpers.renderPhone(entry.phone)}</div>
          <div className='customerInfo lCol'><small>{entry.email}</small></div>
          <div className='customerInfo sCol'>{entry.zip}</div>
          <div className='customerInfo sCol'>{entry.age}</div>
          <div className='customerInfo'>{entry.ethnicity}</div>
          <div className='customerInfo'>{entry.familySize}</div>
        </div>
      )
    })

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
          <div className='customerLabel'>family size</div>
        </div>
        <div className='customerData v'>
          {renderData()}
        </div>
      </div>
    </div>
  );
};

export default Pantry;

