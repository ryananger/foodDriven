import React, {useState, useEffect} from 'react';

import st from 'ryscott-st';

const PantryAppointments = function() {
  const pantry = st.pantry;

  var renderAppointments = function() {
    var rendered = [];

    for (var date in pantry.appointments) {
      rendered.push(<div key={date}>{date}</div>)
    }

    return rendered;
  };

  return (
    <div className='appointments v'>
      {renderAppointments()}
    </div>
  )
};

export default PantryAppointments;