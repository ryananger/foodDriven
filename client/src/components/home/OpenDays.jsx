import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import st            from 'ryscott-st';
import {ax, helpers} from 'util';

import Slots from './Slots.jsx';

const OpenDays = function({pantry}) {
  const open = openDays(pantry);

  st.open = open;

  var calendarValid = function({date, view}) {
    var valid = '';

    if (view === 'month') {
      open.map(function(day) {
        if (day.getDate() !== date.getDate()) {
          return;
        }

        if (day.getMonth() !== date.getMonth()) {
          return;
        }

        if (day.getFullYear() !== date.getFullYear()) {
          return;
        }

        valid = 'valid';
      })
    }

    return valid;
  };

  return (
    <div className='openDays h'>
      <div className='v'>
        <Calendar className='calendar' tileClassName={calendarValid}/>
        <small style={{alignSelf: 'flex-start', margin: '6px'}}>** Service days in blue.</small>
      </div>
      <div className='scheduler v'>
        <b>Next service: &nbsp;{dayStr(open[0])}</b><br/>
        <small>To schedule an appointment select a timeslot from the drop down and then click submit.</small><br/>
        <Slots pantry={pantry}/>
      </div>
    </div>
  )
};

var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var dayStr = function(date) {
  var day   = weekdays[date.getDay()];
  var num   = date.getDate();
  var month = date.toLocaleString('default', { month: 'short' });

  return `${day}, ${month} ${num}`;
};

var openDays = function(pantry) {
  var valid = [];
  var today = new Date();
  var month = today.getMonth();
  var current = new Date();

  current.setMonth(month);
  current.setDate(1);

  var open = pantry.info.open;
  var freq = open.frequency.replaceAll('and', ' ').split(' ').map((entry) => {return Number(entry) || entry});
  var days = open.day.replaceAll(' ', '').split(',');

  var count = {};

  days.map(function(day) {
    count[day] = 0;
  });

  var validate = function(check) {
    if (current >= today) {
      valid.push(check);
    }
  };

  var checkDay = function() {
    var check = new Date(current);
    var day   = current.getDay();

    for (var key in count) {
      if (current.getDate() === 1) {
        count[key] = 0;
      }

      if (key === 'weekend') {
        if (day === 0 || day === 6) {
          validate(check);
        }
      }

      if (key === 'weekday') {
        switch (day) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            validate(check);
            break;
        }
      }

      if (day === weekdays.indexOf(key)) {
        count[key]++;

        if (freq[0] === 'every' || freq.indexOf(count[key]) !== -1) {
          validate(check);
        }
      }
    }

    var next = current.setDate(current.getDate() + 1);

    current = new Date(next);

    if (valid.length < 20) {
      checkDay();
    }
  };

  checkDay();

  return valid;
};

export default OpenDays;

