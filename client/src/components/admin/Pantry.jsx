import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';

import st            from 'ryscott-st';
import {ax, helpers} from 'util';

import CustomerEntry  from './CustomerEntry.jsx';
import CustomerAdd    from './CustomerAdd.jsx';
import CustomerLabels from './CustomerLabels.jsx';
import PantryHead     from './PantryHead.jsx';
import PantryAppointments from './PantryAppointments.jsx';

const Pantry = function() {
  const [editing, setEditing] = st.newState('editing', useState(null));
  const [data, setData]       = st.newState('data', useState([]));
  const [search, setSearch]   = st.newState('search', useState(''));
  const [adding, setAdding]   = useState(false);
  const [viewLength, setViewLength] = useState(100);

  const pantry = st.pantry;

  var getCustomerData = function() {
    setViewLength(100);
    pantry && ax.getCustomersForPantry();
  };

  var renderData = function() {
    var rendered = [];

    if (adding) {
      rendered.push(<CustomerAdd key='add' setAdding={setAdding}/>);
    }

    data.map(function(entry, i) {
      if (search && Number(search)) {
        if (!entry.regId.slice(5).includes(search)) {
          return;
        }
      }

      if (search && !Number(search)) {
        let s = search.toLowerCase();
        let first = entry.firstName.toLowerCase();
        let last  = entry.lastName.toLowerCase();
        let full  = first + ' ' + last;

        if (!full.includes(s)) {
          return;
        }
      }

      rendered.push(<CustomerEntry key={i} i={rendered.length} customer={entry}/>);
    });


    return search ? rendered : rendered.slice(0, viewLength);
  };

  var handleScroll = function(e) {
    if (data.length <= viewLength || search) {return};

    var list = e.target;

    if (list.scrollTop > list.scrollHeight * 0.7) {
      setViewLength(viewLength + 100);
    }
  };

  useEffect(getCustomerData, [pantry]);

  return (
    <div className='pantry v'>
      <div className='pantryAll h'>
        <div className='pantryMain v'>
          <PantryHead setAdding={setAdding}/>
          <div className='customerList v'>
            <CustomerLabels />
            <div id='customerData' className='customerData v' onScroll={handleScroll}>
              {renderData()}
            </div>
          </div>
        </div>
        {pantry && <PantryAppointments />}
      </div>
    </div>
  );
};

export default Pantry;

