import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';

import '../styles/pantry.css';
import st            from 'ryscott-st';
import {ax, helpers} from 'util';

import CustomerEntry from './CustomerEntry.jsx';
import CustomerAdd from './CustomerAdd.jsx';

const Pantry = function() {
  const [sort, setSort] = useState('regId');
  const [dir, setDir] = useState('asc');
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = st.newState('editing', useState(null));
  const [data, setData] = st.newState('data', useState([]));
  const pantry = st.pantry;

  var getCustomerData = function() {
    let sortStr = `/${sort}-${dir}`;

    pantry && ax.getCustomersForPantry(null, sortStr);
  };

  var addCustomer = function() {
    var list = document.getElementById('customerData');

    list.scrollTop = 0;
    setAdding(true);
  };

  var changeSort = function(e) {
    let sortStr = '/';

    switch(e.target.id) {
      case 'searchSelect':
        setSort(e.target.value);
        sortStr += e.target.value + '-' + dir;
        break;
      case 'searchDir':
        setDir(e.target.value);
        sortStr += sort + '-' + e.target.value;
        break;
    };

    ax.getCustomersForPantry(null, sortStr);

    console.log(sortStr);
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
        <form className='searchInterface h'>
          search:
          <input id='customerSearch' placeholder='Search by id # or name.'/>
          sort:
          <select id='searchSelect' value={sort} onChange={changeSort}>
            <option value='regId'>ID number.</option>
            <option value='lastName'>Last name.</option>
            <option value='phone'>Phone.</option>
            <option value='zip'>Zip.</option>
            <option value='age'>Age.</option>
            <option value='ethnicity'>Ethnicity.</option>
            <option value='familySize'>Family size.</option>
          </select>
          <select id='searchDir' value={dir} onChange={changeSort}>
            <option value='asc'>Lowest first.</option>
            <option value='des'>Highest first.</option>
          </select>
        </form>
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

