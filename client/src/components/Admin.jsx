import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';

import '../styles/admin.css';
import st            from 'ryscott-st';
import {ax, helpers} from 'util';

const Admin = function() {
  const [signUp, setSignUp] = useState(false);

  return (
    <div className='admin h'>
      <div className='pantryList v'>
        <div className='pantryListHead h'>
          <h3>PANTRIES</h3>
          <Plus size={24}/>
        </div>

      </div>
      <div className='pantryView v'>
        <div className='pantryNav h'>
          <h3>pantryName</h3>
        </div>
        <div className='pantryMain v'></div>
      </div>
    </div>
  )
};

export default Admin;

