import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';

import '../styles/admin.css';
import st            from 'ryscott-st';
import {ax, helpers} from 'util';

import Pantry from './Pantry.jsx';

const Admin = function() {
  const [create, setCreate] = useState(true);

  return (
    <div className='admin h'>
      <div className='pantryList v'>
        <div className='pantryListHead h'>
          <h3>PANTRIES</h3>
          <Plus size={24}/>
        </div>
        <div className='pantryListBody v'>

        </div>
      </div>
      <div className='pantryView v'>
        <div className='pantryNav h'>
          <h3>{create ? 'Create a new pantry!' : 'pantryName'}</h3>
        </div>
        <Pantry create={create}/>
      </div>
    </div>
  )
};

export default Admin;

