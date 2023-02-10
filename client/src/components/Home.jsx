import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';

import '../styles/admin.css';
import st            from 'ryscott-st';
import {ax, helpers} from 'util';

import Pantry from './Pantry.jsx';

const Home = function() {
  const user = st.user;

  return (
    <div className='admin h'>
      <div className='pantryList v'>
        <div className='pantryListHead h'>
          <h3>PANTRIES</h3>
        </div>
        <div className='pantryListBody v'>
          {user.pantries.map((pantry) => {return pantry.name})}
        </div>
      </div>
      <div className='pantryView v'>
        <div className='pantryNav h'>
          <h3>{user ? `Hello, ${user.username}!` : 'Welcome!'}</h3>
        </div>
        <Pantry />
      </div>
    </div>
  )
};

export default Admin;

