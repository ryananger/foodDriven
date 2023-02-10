import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';

import '../styles/admin.css';
import st            from 'ryscott-st';
import {ax, helpers} from 'util';

import Pantry from './Pantry.jsx';
import PantryCreate from './PantryCreate.jsx';

const Admin = function() {
  const [create, setCreate] = st.newState('create', useState(false));

  const user = st.user;

  var renderPantries = function() {
    var pantries = [];

    user.pantries.map(function(pantry, i) {
      var mod = i % 2 === 0 ? '' : 'light'
      pantries.push(<div key={i} className={`pantryEntry ${mod}`}><b>{pantry.name}</b></div>)
    });

    return pantries;
  };

  return (
    <div className='admin h'>
      <div className='pantryList v'>
        <div className='pantryListHead h'>
          <h3>PANTRIES</h3>
          {user && <Plus className='icon' size={24} onClick={()=>{setCreate(true)}}/>}
        </div>
        <div className='pantryListBody v'>
          {user && renderPantries()}
        </div>
      </div>
      <div className='pantryView v'>
        <div className='pantryNav h'>
          <h3>{create ? 'Create a new pantry!' : (user ? `Hello, ${user.username}!` : 'Welcome!')}</h3>
        </div>
        {create ? <PantryCreate /> : <Pantry />}
      </div>
    </div>
  )
};

export default Admin;

