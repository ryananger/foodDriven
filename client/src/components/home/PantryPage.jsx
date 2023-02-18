import React, {useEffect, useState} from 'react';

import st            from 'ryscott-st';
import {ax, helpers} from 'util';

import OpenDays from './OpenDays.jsx';

const PantryPage = function({pantry}) {
  const [registered, setRegistered] = useState(false);
  const user = st.user;

  var register = function(e) {
    setRegistered(true);
    ax.addCustomerToPantry(user.uid, pantry.email);

    e.stopPropagation();
  };

  var registerButton = function() {
    var buttons = {
      register:   <button className='button register' onClick={register}>register</button>,
      registered: <div className='registered v'>registered</div>
    };

    return registered ? buttons.registered : buttons.register;
  };

  var renderURL = function() {
    return (<div className='pantryInfo h'><b>url: </b>/{pantry.info.url}</div>);
  };

  var renderHours = function() {
    var rendered = [];
    var hours = pantry.info.hours;

    for (var key in hours) {
      if (!hours[key]) {return};

      rendered.push(<small key={key} className='pantryHours h'><b>{key}: </b>{hours[key]}</small>)
    }

    if (rendered[0]) {
      rendered.push(<br key='br'/>);
    }

    return rendered;
  };

  var renderOpen = function() {
    var open    = pantry.info.open;
    var openStr = '';

    if (!open.day) {return};

    switch (open.frequency) {
      case '1':
        openStr += 'First';
        break;
      case '2':
        openStr += 'Second';
        break;
      case '3':
        openStr += 'Third';
        break;
      case '4':
        openStr += 'Fourth';
        break;
      case '1and3':
        openStr += 'First and Third';
        break;
      case '2and4':
        openStr += 'Second and Fourth';
        break;
      case 'every':
        openStr += 'Every';
        break;
    };

    openStr += ' ' + pantry.info.open.day + '.';

    return (<b><div>{openStr}</div></b>);
  };

  var checkRegistered = function() {
    if (!user) {return};

    var inPantry = false;

    pantry.customers.map(function(uid) {
      if (uid === user.uid) {
        inPantry = true;
      }
    })

    setRegistered(inPantry);
  };

  useEffect(checkRegistered, [pantry]);

  return (
    <div className='pantryPage h'>
      <div className='pantryPageLeft v'>
        <img className='pantryPageImage' src={process.env.URL + 'public/thumb.jpg'}/>
        <h1>{pantry.name}</h1>
        {pantry.info.url && renderURL()}
        <div className='pantryInfo h'><b>email: </b>{pantry.email}</div>
        <div className='pantryInfo h'><b>phone: </b>{helpers.renderPhone(pantry.phone)}</div>
        <br/>
        <div className='pantryInfo h'><b>address: </b></div>
        <div className='pantryInfo h' style={{paddingLeft: '1vh'}}>{pantry.address}</div>
        <div className='pantryInfo h' style={{paddingLeft: '1vh'}}>{pantry.city}, {helpers.abbrState(pantry.state, 'abbr')} {pantry.zip}</div>
        <br/>
        <div className='pantryInfo h'><b>{pantry.info.appointment === 'yes' ? 'Appointment only.' : 'Walk-ins welcome!'}</b></div>
        <div className='pantryInfo h'><b>{pantry.info.register === 'yes' ? 'Registration required.' : 'Registration is not required.'}</b></div>
      </div>
      <div className='pantryPageRight v'>
        {pantry.info.bio && <h2 style={{marginBottom: '2vh'}}>{pantry.info.bio}</h2>}
        {renderOpen()}
        {renderHours()}
        {pantry.info.open.day && <OpenDays pantry={pantry}/>}
        <br/>
        <br/>
        <div className='pantryInfo h'><b>{pantry.info.other}</b></div>
        {user && user.customerInfo && registerButton()}
      </div>
    </div>
  )
};

export default PantryPage;

