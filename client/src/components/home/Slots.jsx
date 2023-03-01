import React, {useEffect, useState} from 'react';

const Slots = function({pantry}) {
  const [selected, setSelected] = useState(0);

  var renderOptions = function() {
    if (!pantry.appointments) {return};

    var options  = [];
    var firstDay = pantry.appointments[Object.keys(pantry.appointments)[0]];

    for (var timeslot in firstDay) {
      if (firstDay[timeslot].length < pantry.info.slots.num) {
        options.push(<option key={timeslot} timeslot={timeslot} value={options.length}>{timeslot}</option>);
      }
    }

    return options;
  };

  useEffect(()=>{
    setSelected(0);
  }, [pantry]);

  return (
    <select id='scheduleSelect' value={selected} onChange={(e)=>{setSelected(e.target.value)}}>
      {renderOptions()}
    </select>
  )
};

export default Slots;

