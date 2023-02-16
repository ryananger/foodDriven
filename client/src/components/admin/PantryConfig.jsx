import React, {useEffect, useState} from 'react';

import st            from 'ryscott-st';
import {ax, helpers} from 'util';

const PantryConfig = function() {
  const pantry = st.pantry;

  var handleSubmit = function(e) {
    var form = document.getElementById('configForm');

    var inputs = form.elements;
    var update = {
      info: {
        hours: {},
        slots: {num: null, timeframe: null},
        open:  {frequency: null, frequencyDay: null}
      },
    };

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];

      if (input.value) {
        var value = input.value;

        switch(input.name) {
          default:
            update[input.name] = value;
            break;
          case 'pantryName':
            update.name = value;
            break;
          case 'address2':
            var split = value.replaceAll(', ', ' ').split(' ');

            update.city  = split[0];
            update.state = split[1];
            update.zip   = split[2];
            break;
          case 'url':
          case 'bio':
          case 'appointment':
          case 'register':
            update.info[input.name] = value;
            break;
          case 'slots':
            update.info.slots = {
              num: value,
              timeframe: form.timeframe.value
            };
            break;
          case 'm':
          case 't':
          case 'w':
          case 'th':
          case 'f':
          case 's':
          case 'sun':
            update.info.hours[input.name] = value;
            break;
          case 'frequency':
            update.info.open = {
              frequency: value,
              day: form.frequencyDay.value
            }
            break;
          case 'other':
            update.info.other = value;
            break;
          case 'frequencyDay':
          case 'timeframe':
            break;
        }
      }
    }

    ax.editPantry(update);
  };

  return (
    <div className='pantryConfig h'>
      <form id="configForm" className='configForm v'>
        <div className='configImageContainer h'>
          <img className='pantryImage' src={process.env.URL + 'public/thumb.jpg'}/>
          <div className='v'>
            <div className='configLabel h'>
              <b>name: </b>
              <input name='pantryName' className='configInput' defaultValue={pantry.name}/>
            </div>
            <div className='configLabel h'>
              <b>email: </b>
              <input name='email' className='configInput' defaultValue={pantry.email}/>
            </div>
            <div className='configLabel h'>
              <b>phone: </b>
              <input name='phone' className='configInput' defaultValue={pantry.phone}/>
            </div>
            <div className='configLabel h'>
              <b>address: </b>
              <input name='address' className='configInput' defaultValue={pantry.address}/>
            </div>
            <div className='configLabel h'>
              <b>city, state zip: </b>
              <input name='address2' className='configInput' defaultValue={`${pantry.city}, ${pantry.state} ${pantry.zip}`}/>
            </div>
          </div>
        </div>

        <hr/>
        <div className='configBody v'>
          <div className='configLabel h'>
              <b>url: </b>
              <input name='url' className='configInput' placeholder='Custom url...' defaultValue={pantry.info.url}/>
            </div>
            <div className='configLabel h'>
              <b>bio: </b>
              <textarea name='bio' className='configTextArea' placeholder={`Short bio (140 character limit.)`} defaultValue={pantry.info.bio}/>
            </div>
            <div className='configLabel h'>
              <b>appointment: </b>
              <select name='appointment' className='configInput' defaultValue={pantry.info.appointment}>
                <option value='yes'>
                  Yes.
                </option>
                <option value='no'>
                  No.
                </option>
              </select>
              <small>Appointment only?</small>
            </div>
            <div className='configLabel h'>
              <b>slots: </b>
              <input name='slots' className='configInput iSmall' placeholder='Number...' defaultValue={pantry.info.slots.num}/> per
              <select name='timeframe' className='configInput iSmall' defaultValue='15' defaultValue={pantry.info.slots.timeframe}>
                <option value='15'>
                  15 minutes.
                </option>
                <option value='30'>
                  30 minutes.
                </option>
                <option value='hr'>
                  Hour.
                </option>
                <option value='day'>
                  Day.
                </option>
              </select>
            </div>
            <br/>
            <div className='configLabel h'>
              <b>register: </b>
              <select name='register' className='configInput' defaultValue={pantry.info.register}>
                <option value='yes'>
                  Yes.
                </option>
                <option value='no'>
                  No.
                </option>
              </select>
              <small>Registration required?</small>
            </div>

            <hr/>
            <div className='configLabel v'>
              <b>hours: </b>
            </div>
            <div className='configLabel h'><b>m: </b>  <input name='m'   className='configInput iMedium' placeholder='Format: 11am - 1pm' defaultValue={pantry.info.hours.m}/></div>
            <div className='configLabel h'><b>t: </b>  <input name='t'   className='configInput iMedium' defaultValue={pantry.info.hours.t}/></div>
            <div className='configLabel h'><b>w: </b>  <input name='w'   className='configInput iMedium' defaultValue={pantry.info.hours.w}/></div>
            <div className='configLabel h'><b>th: </b> <input name='th'  className='configInput iMedium' defaultValue={pantry.info.hours.th}/></div>
            <div className='configLabel h'><b>f: </b>  <input name='f'   className='configInput iMedium' defaultValue={pantry.info.hours.f}/></div>
            <div className='configLabel h'><b>s: </b>  <input name='s'   className='configInput iMedium' defaultValue={pantry.info.hours.s}/></div>
            <div className='configLabel h'><b>sun: </b><input name='sun' className='configInput iMedium' defaultValue={pantry.info.hours.sun}/></div>
            <br/>
            <div className='configLabel v'>
              <b>days open: </b>
            </div>
            <div className='configLabel h'>
              <b>frequency: </b>
              <select name='frequency' className='configInput iMedium' defaultValue={pantry.info.open.frequency}>
                <option value='every'>Every</option>
                <option value='1'>1st</option>
                <option value='2'>2nd</option>
                <option value='3'>3rd</option>
                <option value='4'>4th</option>
                <option value='1and3'>1st and 3rd</option>
                <option value='2and4'>2nd and 4th</option>
              </select>
            </div>
            <div className='configLabel h'>
              <b>day: </b>
              <input name='frequencyDay' className='configInput' placeholder='Eg: Monday, weekend; weekday;' defaultValue={pantry.info.open.day}/>
              <small>Day name (Monday, etc.), 'weekend', or 'weekday', separated by comma.</small>
            </div>
            <div className='configLabel h'>
              <b>other info: </b>
              <input name='other' className='configInput' placeholder='Eg: Hot senior meal every first sunday.' defaultValue={pantry.info.other}/>
            </div>
        </div>

        <hr/>
        <div className='saveContainer v'>
          <div className='configSave v' onClick={handleSubmit}>save</div>
        </div>
      </form>
    </div>
  );
};

export default PantryConfig;

