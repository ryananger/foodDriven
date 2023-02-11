import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';

import '../styles/home.css';
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
    <div className='home h'>
      <div className='homeContainer left v'>
        <div className='card noPad v'>
          <div className='topBar h'/>

        </div>
      </div>

      <div className='homeContainer mid v'>
        <div className='homeBody card noPad v'>
          <div className='topBar h'/>
          <div className='cardContainer v'>
            {renderPantries()}
          </div>
        </div>
      </div>

      <div className='homeContainer right v'>
        <div className='card noPad v'>
          <div className='topBar h'/>

        </div>
      </div>
    </div>
  )
};

export default Home;

