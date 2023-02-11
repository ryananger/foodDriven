import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';

import '../styles/home.css';
import st            from 'ryscott-st';
import {ax, helpers} from 'util';

const Home = function() {
  const user = st.user;

  return (
    <div className='home h'>
      <div className='homeLeft card noPad v'>
        <div className='topBar h'/>
      </div>
      <div className='homeBody card noPad v'>
        <div className='topBar h'>
          {st.pantries.length}
        </div>
      </div>
      <div className='homeRight card noPad v'>
        <div className='topBar h'/>
      </div>
    </div>
  )
};

export default Home;

