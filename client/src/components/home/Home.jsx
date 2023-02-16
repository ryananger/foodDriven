import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';

import st            from 'ryscott-st';
import {ax, helpers} from 'util';

import PantryCard from './PantryCard.jsx';

const Home = function() {
  const user     = st.user;
  const pantries = st.pantries;

  var renderPantries = function() {
    var rendered = [];

    pantries.map(function(pantry, i) {
      rendered.push(
        <PantryCard key={i} pantry={pantry} index={i}/>
      )
    })

    return rendered;
  };

  return (

      <div className='homeContainer v'>
        <div className='homeBody card noPad v'>
          <div className='topBar h'/>
          <div id='cardContainer' className='cardContainer v'>
            {renderPantries()}
          </div>
        </div>
      </div>

  )
};

export default Home;

