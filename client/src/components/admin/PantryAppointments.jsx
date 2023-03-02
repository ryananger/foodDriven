import React, {useState, useEffect} from 'react';

import st   from 'ryscott-st';
import {ax} from 'util';

const PantryAppointments = function() {
  const [appointments, setAppointments] = useState(null);
  const pantry = st.pantry;

  var renderAppointments = function() {
    var rendered = [];
    var appts = pantry.appointments;

    for (var date in appts) {
      rendered.push(<h3 key={date + '_head'}>{date}</h3>);

      var noAppts = true;

      for (var timeslot in appts[date]) {
        if (appts[date][timeslot].length > 0) {
          noAppts = false;
          rendered.push(<h3 key={timeslot}>{timeslot}</h3>);

          appts[date][timeslot].map(function(customer, i) {
            rendered.push(<div key={i}>{customer}</div>);
          })
        }
      }

      if (noAppts) {
        rendered.push(<div key='empty'>No appointments scheduled.</div>);
      }
    }

    return rendered;
  };

  useEffect(()=>{
    ax.getAppointmentsForPantry(pantry.email, setAppointments);
  }, []);

  return (
    <div className='appointments v'>
      {renderAppointments()}
    </div>
  )
};

export default PantryAppointments;