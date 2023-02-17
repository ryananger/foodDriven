import React, {useEffect, useState} from 'react';

import st            from 'ryscott-st';
import {ax, helpers} from 'util';

import PantryCard   from './PantryCard.jsx';
import PantryPage   from './PantryPage.jsx';

const Home = function() {
  const [pantryView, setPantryView] = useState(null);

  const user     = st.user;
  const pantries = st.pantries;
  const url      = window.location.pathname.slice(1);

  var renderPantries = function() {
    var rendered = [];

    pantries.map(function(pantry, i) {
      if (pantryView && pantry.email === pantryView.email) {
        return;
      }

      rendered.push(
        <PantryCard key={i} pantry={pantry} index={i} setPantryView={setPantryView}/>
      )
    })

    return rendered;
  };

  var setScrollTop = function() {
    if (pantryView) {
      document.getElementById('cardContainer').scrollTop = 0;
    }
  };

  var urlPantry = function() {
    if (window.location.pathname !== '/') {
      ax.getPantryByURL(window.location.pathname, setPantryView);
    }
  };

  useEffect(setScrollTop, [pantryView]);
  useEffect(urlPantry, []);

  return (
    <div className='homeContainer v'>
      <div className='homeBody card noPad v'>
        <div className='topBar h'/>
        <div id='cardContainer' className='cardContainer v'>
          {pantryView && <PantryPage pantry={pantryView}/>}
          {url ? (pantryView ? renderPantries() : '') : renderPantries()}
        </div>
      </div>
    </div>
  )
};

export default Home;

