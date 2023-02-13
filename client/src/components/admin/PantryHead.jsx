import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';

import st            from 'ryscott-st';
import {ax, helpers} from 'util';

import CustomerEntry from './CustomerEntry.jsx';
import CustomerAdd from './CustomerAdd.jsx';

const PantryHead = function({setAdding}) {
  const [sort, setSort]     = useState('regId');
  const [dir, setDir]       = useState('asc');

  st.sortStr = `/${sort}-${dir}`;

  var addCustomer = function() {
    setScrollTop();
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

    setScrollTop();
    ax.getCustomersForPantry(null, sortStr);
  };

  var setScrollTop = function() {
    var list = document.getElementById('customerData');

    list.scrollTop = 0;
  };

  return (
    <div className='pantryHead h'>
      <form className='searchInterface h'>
        search:
        <input id='customerSearch' placeholder='Search by id # or name.' onChange={(e)=>{st.setSearch(e.target.value)}}/>
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
          <option value='asc'>Ascending.</option>
          <option value='des'>Descending.</option>
        </select>
      </form>
      <Plus className='icon' size={24} onClick={addCustomer}/>
    </div>
  );
};

export default PantryHead;

