import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';

import '../styles/admin.css';
import st            from 'ryscott-st';
import {ax, helpers} from 'util';

import Pantry from './Pantry.jsx';
import PantryCreate from './PantryCreate.jsx';

const Admin = function() {
  const [create, setCreate] = st.newState('create', useState(false));
  const [pantry, setPantry] = st.newState('pantry', useState(null));

  const user = st.user;

  var renderPantryList = function() {
    var pantries = [];

    user.pantries.map(function(pantry, i) {
      var mod = i % 2 === 0 ? '' : 'light';

      pantries.push(
        <div key={i} index={i} className={`pantryListEntry ${mod}`} onClick={()=>{setPantry(pantry)}}>
          <b>{pantry.name}</b>
        </div>
      )
    });

    return pantries;
  };

  useEffect(()=>{
    if (!pantry) {
      setPantry(user.pantries[0]);
    }
  }, [user]);

  return (
    <div className='admin h'>
      <div className='pantryList v'>
        <div className='topBar h'>
          <h3>PANTRIES</h3>
          <Plus className='icon' size={24} onClick={()=>{setCreate(true)}}/>
        </div>
        <div className='pantryListBody v'>
          {renderPantryList()}
        </div>
      </div>
      <div className='pantryView v'>
        <div className='topBar h'>
          <h3>{create ? 'Create a new pantry!' : `${pantry ? pantry.name : ''}`}</h3>
        </div>
        {create ? <PantryCreate /> : <Pantry />}
      </div>
    </div>
  )
};

export default Admin;

