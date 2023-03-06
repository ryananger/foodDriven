import React, {useState, useEffect} from 'react';

import st from 'ryscott-st';

const AddressLookup = function() {
  const [auto, setAuto] = st.newState('auto', useState(null));
  const options = {
    componentRestrictions: {country: 'us'}
  };

  useEffect(()=>{
    const input = document.getElementById('autoAddress');

    window.initPlaces = function() {
      setAuto(new google.maps.places.Autocomplete(input, options));
    };

    const script = document.createElement('script');

    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.MAPS_API}&libraries=places&callback=initPlaces`;
    document.head.append(script);
  }, []);

  return <input id='autoAddress' type='text' placeholder='Address.' required/>;
};

export default AddressLookup;