import React, {useEffect, useState} from 'react';

const Slots = function({pantry}) {
  const [selected, setSelected] = useState(0);

  var renderOptions = function() {
    if (!pantry.appointments) {return};

    var options = [];

    for (var key in pantry.appointments[Object.keys(pantry.appointments)[0]]) {
      options.push(<option key={key} value={options.length}>{key}</option>);
    }

    return options;
  };

  useEffect(()=>{
    setSelected(0);
  }, [pantry]);

  return (
    <select className='scheduleSelect' value={selected} onChange={(e)=>{setSelected(e.target.value)}}>
      {renderOptions()}
    </select>
  )
};

export default Slots;

