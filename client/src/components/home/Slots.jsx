import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';

import st            from 'ryscott-st';
import {ax, helpers} from 'util';

const Slots = function({pantry}) {
  const [selected, setSelected] = useState(0);
  const hours = function() {
    var hours = {};

    for (var key in pantry.info.hours) {
      hours[key] = parseHours(pantry.info.hours[key]);
    }

    return hours;
  }();

  const slots = pantry.info.slots.num;
  const timeframe = function() {
    switch(pantry.info.slots.timeframe) {
      case '15':
      case '30':
        return Number(pantry.info.slots.timeframe);
      case 'hr':
        return 60;
      case 'day':
        return 'day';
    }
  }();

  const day = ['sun', 'm', 't', 'w', 'th', 'f', 's'][st.open[0].getDay()];

  var renderOptions = function() {
    var begin   = hours[day].begin;
    var current = begin;
    var end     = hours[day].end;
    var options = [];

    var getOption = function() {
      var hr  = current.m === 'p' && current.hour > 12 ? current.hour - 12 : current.hour;
      var min = current.minute ? ':' + current.minute : ':00';
      var m   = current.m = current.hour >= 12 ? 'p' : 'a';

      var next = current;

      if (!timeframe || timeframe === 'day') {
        next = end;
      } else {
        next.minute += timeframe;
        if (next.minute >= 60) {
          next.hour === 24 ? next.hour = 1 : next.hour++;
          next.minute -= 60;
        }
      }

      var hr2  = next.m === 'p' && next.hour > 12 ? next.hour - 12 : next.hour;
      var min2 = next.minute ? ':' + next.minute : ':00';
      var m2   = next.m = next.hour >= 12 ? 'p' : 'a';

      var str  = hr + min + m + 'm - ' + hr2 + min2 + m2 + 'm';

      options.push(<option key={str} value={options.length}>{str}</option>);

      current = next;

      if (next.hour >= end.hour && next.minute >= end.minute) {
        return;
      } else {
        getOption();
      }
    };

    getOption();

    return options;
  };

  return (
    <div className='scheduleInterface h'>
      <select className='scheduleSelect' value={selected} onChange={(e)=>{setSelected(e.target.value)}}>
        {renderOptions()}
      </select>
      <button className='button scheduleButton'>submit</button>
    </div>
  )
};

var parseHours = function(str) {
  str = str.replaceAll(' ', '');
  var split = str.split('-');
  var regex = /(?<hour>[0-9]{1,2})(?<minute>:[0-9]{2})*(?<m>[a]|[p])m/;

  var result = [];

  split.map(function(entry) {
    var groups = entry.match(regex).groups;

    groups.hour = Number(groups.hour);
    groups.minute = groups.minute ? Number(groups.minute.slice(1)) : null;

    if (groups.m === 'p' && groups.hour !== 12) {
      groups.hour += 12;
    }

    if (groups.m === 'a' && groups.hour === 12) {
      groups.hour = 0;
    }

    result.push(groups);
  })

  var begin = result[0];
  var end   = result[1];

  return {begin, end};
};

export default Slots;

