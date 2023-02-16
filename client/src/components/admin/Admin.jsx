import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';
import {MdSettings as Config} from 'react-icons/md';

import st            from 'ryscott-st';
import {ax, helpers} from 'util';

import Pantry from './Pantry.jsx';
import PantryCreate from './PantryCreate.jsx';
import PantryConfig from './PantryConfig.jsx';

const Admin = function() {
  const [create, setCreate] = st.newState('create', useState(false));
  const [pantry, setPantry] = st.newState('pantry', useState(null));
  const [config, setConfig] = st.newState('config', useState(false));
  const [index, setIndex]   = useState(0);

  const user = st.user;

  var handlePantryClick = function(pantry, index) {
    setCreate(false);
    setConfig(false);
    setPantry(user.pantries[index]);
    setIndex(index);
  };

  var renderPantryList = function() {
    var pantries = [];

    user.pantries.map(function(pantry, i) {
      var mod = i % 2 === 0 ? '' : 'light';
      var index = i;

      pantries.push(
        <div key={i} index={i} className={`pantryListEntry ${mod}`} onClick={()=>{handlePantryClick(pantry, index)}}>
          <b>{pantry.name}</b>
        </div>
      )
    });

    return pantries;
  };

  useEffect(()=>{
    setPantry(user.pantries[index]);
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

          <div className='configButton' onClick={()=>{setConfig(!config)}}>{config ? 'list' : 'config'}</div>
        </div>
        {create ? <PantryCreate /> : (config ? <PantryConfig /> : <Pantry />)}
      </div>
    </div>
  )
};

export default Admin;

