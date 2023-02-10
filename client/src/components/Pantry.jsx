import React, {useEffect, useState} from 'react';

import '../styles/pantry.css';
import st            from 'ryscott-st';
import {ax, auth, helpers} from 'util';

const Pantry = function() {

  return (
    <div className='pantry v'>
      <div className='customerList v'>
        <div className='customerLabels h'>
          <div className='customerLabel'>#</div>
          <div className='customerLabel'>name</div>
          <div className='customerLabel'>phone</div>
          <div className='customerLabel'>email</div>
          <div className='customerLabel'>zip</div>
          <div className='customerLabel'>age</div>
          <div className='customerLabel'>ethnicity</div>
          <div className='customerLabel'>family size</div>
        </div>
      </div>
    </div>
  )
};

export default Pantry;

