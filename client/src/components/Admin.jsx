import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';

import '../styles/admin.css';
import st            from 'ryscott-st';
import {ax, helpers} from 'util';

import Pantry from './Pantry.jsx';

const Admin = function() {
  const [create, setCreate] = st.newState('create', useState(false));

  const user = st.user;

  return (
    <div className='admin h'>
      <div className='pantryList v'>
        <div className='pantryListHead h'>
          <h3>PANTRIES</h3>
          {user && <Plus className='icon' size={24} onClick={()=>{setCreate(true)}}/>}
        </div>
        <div className='pantryListBody v'>

        </div>
      </div>
      <div className='pantryView v'>
        <div className='pantryNav h'>
          <h3>{create ? 'Create a new pantry!' : (user ? `Hello, ${user.username}!` : 'Welcome!')}</h3>
        </div>
        <Pantry />
      </div>
    </div>
  )
};

export default Admin;

