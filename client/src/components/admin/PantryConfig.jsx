import React, {useEffect, useState} from 'react';

import st            from 'ryscott-st';
import {ax, helpers} from 'util';

const PantryConfig = function() {
  const pantry = st.pantry;

  return (
    <div className='pantryConfig h'>
      <form id="configForm" className='configForm h'>
        <div className='configForm v'>
          <div className='configLabel h'>
            <b>name: </b><input className='configInput' defaultValue={pantry.name}/>
          </div>
          <div className='configLabel h'>
            <b>email: </b><input className='configInput' defaultValue={pantry.email}/>
          </div>
          <div className='configLabel h'>
            <b>phone: </b><input className='configInput' defaultValue={pantry.phone}/>
          </div>
          <div className='configLabel h'>
            <b>address: </b><input className='configInput' defaultValue={pantry.address}/>
          </div>
          <div className='configLabel h'>
            <b>city, state zip: </b><input className='configInput' defaultValue={`${pantry.city}, ${pantry.state} ${pantry.zip}`}/>
          </div>
          <br/>
          <div className='configLabel h'>
            <b>url: </b><input className='configInput' defaultValue={`Custom url.`}/>
          </div>
          <div className='configLabel h'>
            <b>bio: </b><textarea className='configTextArea' defaultValue={`Short bio (140 character limit.)`}/>
          </div>
          <div className='configLabel h'>
            <b>appointment: </b><select className='configInput' defaultValue={`yes`}>
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
            <b>register: </b><select className='configInput' defaultValue={`yes`}>
              <option value='yes'>
                Yes.
              </option>
              <option value='no'>
                No.
              </option>
            </select>
            <small>Registration required?</small>
          </div>
        </div>
        <div className='configForm v'>
          <div className='configLabel v'>
            <b>hours: </b>
          </div>
          <div className='configLabel h'><b>m: </b><input className='configInput configHours' placeholder='Format: 11am - 1pm'/></div>
          <div className='configLabel h'><b>t: </b><input className='configInput configHours' /></div>
          <div className='configLabel h'><b>w: </b><input className='configInput configHours' /></div>
          <div className='configLabel h'><b>th: </b><input className='configInput configHours' /></div>
          <div className='configLabel h'><b>f: </b><input className='configInput configHours' /></div>
          <div className='configLabel h'><b>s: </b><input className='configInput configHours' /></div>
          <div className='configLabel h'><b>sun: </b><input className='configInput configHours' /></div>
        </div>

        <br/>
      </form>

      <br/><br/>


    </div>
  );
};

export default PantryConfig;

