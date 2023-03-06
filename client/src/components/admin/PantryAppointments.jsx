import React, {useState, useEffect} from 'react';

import st   from 'ryscott-st';
import {ax} from 'util';

const PantryAppointments = function() {
  const [appointments, setAppointments] = useState(null);
  const pantry = st.pantry;

  var renderAppointments = function() {
    var rendered = [];
    var appts = appointments;

    var noAppts = true;

    for (var date in appts) {
      for (var timeslot in appts[date]) {
        if (appts[date][timeslot].length > 0) {
          if (noAppts) {
            rendered.push(<h2 key={date + '_head'}>{date}</h2>);
            noAppts = false;
          }

          var slotText = <h3 key={timeslot} className='timeText'>{timeslot}</h3>;

          rendered.push(
            <div key={timeslot} className='apptTimeslot v'>
              {slotText}
              <div className='apptEntries v'>
                {
                  appts[date][timeslot].map(function(customer, i) {
                    return (<div key={timeslot + i}><b>{customer.firstName + ' ' + customer.lastName}</b> &emsp;{customer.regId}</div>);
                  })
                }
              </div>
            </div>
          );
        }
      }
    }

    if (noAppts) {
      rendered.push(<b>There are no appointments for this pantry.</b>);
    }

    return rendered;
  };

  useEffect(()=>{
    if (pantry) {
      ax.getAppointmentsForPantry(setAppointments);
    }
  }, [pantry]);

  return (
    <div id='appt' className='appointments v'>
      {appointments && renderAppointments()}
    </div>
  )
};

export default PantryAppointments;