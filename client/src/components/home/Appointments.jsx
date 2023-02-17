import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';

import st            from 'ryscott-st';
import {ax, helpers} from 'util';

const Appointments = function({pantry}) {
  const user  = st.user;
  const hours = function() {
    var hours = {};

    for (var key in pantry.info.hours) {
      hours[key] = parseHours(pantry.info.hours[key]);
    }

    return hours;
  }();

  useEffect(()=>{
    openDays(pantry);
  }, [pantry])

  return (
    <div className='appointmentSelect h'>
      <input type='date'/>
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

    delete groups.m;

    result.push(groups);
  })

  var begin = result[0];
  var end   = result[1];

  return {begin, end};
};

var openDays = function(pantry) {
  var valid = [];
  var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var today = new Date();
  var month = today.getMonth();
  var current = new Date();

  current.setMonth(month);
  current.setDate(1);

  var open = pantry.info.open;
  var freq = open.frequency;
  var days = open.day.replaceAll(' ', '').split(',');

  var count = {};

  freq = freq.replaceAll('and', ' ').split(' ');
  console.log(freq);

  days.map(function(day) {
    count[day] = 0;
  });


  var checkDay = function() {
    for (var key in count) {
      if (current.getDate() === 1) {
        count[key] = 0;
      }

      if (current.getDay() === weekdays.indexOf(key)) {
        var check = new Date(current);

        count[key]++;

        valid.push(check);
      }
    }

    var next = current.setDate(current.getDate() + 1);

    current = new Date(next);

    if (valid.length < 10) {
      checkDay();
    }
  };

  checkDay();

  console.log(valid);
};

export default Appointments;

