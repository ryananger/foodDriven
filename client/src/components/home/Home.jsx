import React, {useEffect, useState} from 'react';

import st            from 'ryscott-st';
import {ax, helpers} from 'util';

import PantryCard from './PantryCard.jsx';
import PantryPage from './PantryPage.jsx';

const Home = function() {
  const [pantryView, setPantryView] = useState(null);

  const user     = st.user;
  const pantries = st.pantries;

  var renderPantries = function() {
    var rendered = [];

    pantries.map(function(pantry, i) {
      if (pantry.email === pantryView.email) {
        return;
      }

      rendered.push(
        <PantryCard key={i} pantry={pantry} index={i}/>
      )
    })

    return rendered;
  };

  useEffect(()=>{
    if (window.location.pathname !== '/') {
      ax.getPantryByURL(window.location.pathname, setPantryView);
    }
  }, [pantries]);

  return (
    <div className='homeContainer v'>
      <div className='homeBody card noPad v'>
        <div className='topBar h'/>
        <div id='cardContainer' className='cardContainer v'>
          {pantryView && <PantryPage pantry={pantryView}/>}
          {renderPantries()}
        </div>
      </div>
    </div>
  )
};

export default Home;

