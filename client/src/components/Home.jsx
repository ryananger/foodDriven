import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';

import '../styles/home.css';
import st            from 'ryscott-st';
import {ax, helpers} from 'util';

const Home = function() {
  const user     = st.user;
  const pantries = st.pantries;

  var pantryClick = function(e) {
    if (!user) {return};

    var pantry = pantries[e.target.getAttribute('index')];

    console.log(pantry);

    ax.addCustomerToPantry(user.uid, pantry.email);
  };

  var renderPantries = function() {
    var rendered = [];

    pantries.map(function(pantry, i) {
      rendered.push(
        <div key={i} index={i} className='pantryCard h' onClick={pantryClick}>
          {pantry.name}
        </div>
      )
    })

    return rendered;
  };

  return (
    <div className='home h'>
      <div className='homeLeft card noPad v'>
        <div className='topBar h'/>
      </div>
      <div className='homeBody card noPad v'>
        <div className='topBar h'>
          {st.pantries.length}
        </div>
        <div className='cardContainer v'>
          {renderPantries()}
        </div>
      </div>
      <div className='homeRight card noPad v'>
        <div className='topBar h'/>
      </div>
    </div>
  )
};

export default Home;

