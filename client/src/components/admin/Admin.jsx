import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';
import {MdSettings as Config} from 'react-icons/md';

import st            from 'ryscott-st';
import {ax, helpers} from 'util';

import Pantry from './Pantry.jsx';
import PantryCreate from './PantryCreate.jsx';
import PantryConfig from './PantryConfig.jsx';
import PantryAppointments from './PantryAppointments.jsx';

const Admin = function() {
  const [create, setCreate] = st.newState('create', useState(false));
  const [pantry, setPantry] = st.newState('pantry', useState(null));
  const [config, setConfig] = useState(false);
  const [appt, setAppt]     = useState(false);

  const user = st.user;

  var handlePantryClick = function(pantry, index) {
    setCreate(false);
    setConfig(false);
    setAppt(false);
    setPantry(user.pantries[index]);
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

          <div className='h'>
            {!config && <div className='configButton' onClick={()=>{setAppt(!appt)}}>{appt ? 'back' : 'appointments'}</div>}
            {!appt && <div className='configButton' onClick={()=>{setConfig(!config)}}>{config ? 'back' : 'settings'}</div>}
          </div>
        </div>
        {create ? <PantryCreate /> :
         config ? <PantryConfig /> :
         appt   ? <PantryAppointments /> : <Pantry />}
      </div>
    </div>
  )
};

export default Admin;

