var createAppointments = function(pantry) {
  const open  = openDays(pantry);
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

  var getOptions = function(index) {
    var day = ['sun', 'm', 't', 'w', 'th', 'f', 's'][open[index].getDay()];
    var begin   = hours[day].begin;
    var current = {...begin};
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

      options.push(str);

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

  var appointments = {};

  open.map(function(entry, i) {
    var str = dayStr(entry).split(', ')[1];
    var options = getOptions(i);

    appointments[str] = {};

    options.map(function(option) {
      if (pantry.appointments &&
          pantry.appointments[str] &&
          pantry.appointments[str][option]) {
        appointments[str][option] = pantry.appointments[str][option];
      } else {
        appointments[str][option] = [];
      }
    })
  });

  return appointments;
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

      if (day === weekdays.indexOf(key)) {
        count[key]++;

        if (freq[0] === 'every' || freq.indexOf(count[key]) !== -1) {
          validate(check);
        }
      }
    }

    var next = current.setDate(current.getDate() + 1);

    current = new Date(next);

    if (valid.length < 8) {
      checkDay();
    }
  };

  checkDay();

  return valid;
};

export default createAppointments;

