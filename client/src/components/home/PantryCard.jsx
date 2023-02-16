import React, {useEffect, useState} from 'react';
import {IoMdMail as Mail} from 'react-icons/io';
import {AiFillPhone as Phone} from 'react-icons/ai';

import st            from 'ryscott-st';
import {ax, helpers} from 'util';

const PantryCard = function({pantry, index}) {
  const [registered, setRegistered] = useState(false);

  const user     = st.user;
  const pantries = st.pantries;

  var register = function(e) {
    setRegistered(true);
    ax.addCustomerToPantry(user.uid, pantry.email);

    e.stopPropagation();
  };

  var registerButton = function() {
    var buttons = {
      register:   <button className='register' onClick={register}>register</button>,
      registered: <div className='registered v'>registered</div>
    };

    return registered ? buttons.registered : buttons.register;
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

    return (<div><div>{openStr}</div><br/></div>);
  };

  var renderHours = function() {
    var rendered = [];
    var hours = pantry.info.hours;

    for (var key in hours) {
      if (!hours[key]) {return};

      rendered.push(<small key={key} className='pantryHours h'><b>{key}: </b>{hours[key]}</small>)
    }

    if (rendered[0]) {
      rendered.push(<br/>);
    }

    return rendered;
  };

  useEffect(()=>{
    if (!user) {return};

    pantry.customers.map(function(uid) {
      if (uid === user.uid) {
        setRegistered(true);
      }
    })
  }, []);

  return (
    <div className='pantryCard h' onClick={/* route to pantry page */}>
      <div className='pantryCardLeft h'>
        <img className='pantryImage pantryThumb' src={process.env.URL + 'public/thumb.jpg'}/>
        <div className='pantryCardBody v'>
          <div><h3>{pantry.name}</h3></div>
          <div>{pantry.email}</div>
          <div>{helpers.renderPhone(pantry.phone)}</div>
          <br/>
          <div>{pantry.address}</div>
          <div>{pantry.city}, {helpers.abbrState(pantry.state, 'abbr')} {pantry.zip}</div>
          <br/>
          <div><small>{pantry.info.appointment === 'yes' ? 'Appointment only.' : ''}</small></div>
          <div><small>{pantry.info.register === 'yes' ? 'Registration required.' : ''}</small></div>
        </div>
        <div className='pantryCardMain v'>
          {renderOpen()}
          {renderHours()}
          <div>{pantry.info.other}</div>
        </div>
      </div>
      <div className='pantryCardRight v'>
        {user && user.customerInfo && registerButton()}
      </div>
    </div>
  )
};

export default PantryCard;

