import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';

import '../styles/home.css';
import st            from 'ryscott-st';
import {ax, helpers} from 'util';

const Home = function() {
  const user = st.user;

  return (
    <div className='home v'>
        Hi!
    </div>
  )
};

export default Home;

