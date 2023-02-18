import React, {useEffect, useState} from 'react';

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

    var parseDate = function(date) {
      var hr  = date.m === 'p' && date.hour > 12 ? date.hour - 12 : date.hour;
      var min = date.minute ? ':' + date.minute : ':00';
      var m   = date.m = date.hour >= 12 ? 'p' : 'a';

      return {hr, min, m};
    };

    var getOption = function() {
      var p1 = parseDate(current);

      var next = current;

      if (!timeframe || timeframe === 'day') {
        next = end;
      } else {
        next.minute += timeframe;
        if (next.minute >= 60) {
          next.hour = next.hour === 24 ? 1 : next.hour + 1;
          next.minute -= 60;
        }
      }

      if ((next.hour > end.hour) || (next.hour === end.hour && next.minute >= end.minute)) {
        next = end;
      }

      var p2 = parseDate(next);

      var str = p1.hr + p1.min + p1.m + 'm - ' + p2.hr + p2.min + p2.m + 'm';

      options.push(<option key={str} value={options.length}>{str}</option>);

      if (next.hour === end.hour && next.minute >= end.minute) {
        return;
      } else {
        current = next;
        getOption();
      }
    };

    getOption();

    return options;
  };

  useEffect(()=>{
    setSelected(0);
  }, [pantry]);

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

