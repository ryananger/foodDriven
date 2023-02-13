import React, {useEffect, useState} from 'react';
import '../../styles/pantry.css';

const CustomerLabels = function() {
  return (
    <div className='customerLabels h'>
      <div className='customerLabel'>#</div>
      <div className='customerLabel'>name</div>
      <div className='customerLabel'>phone</div>
      <div className='customerLabel lCol'>email</div>
      <div className='customerLabel sCol'>zip</div>
      <div className='customerLabel sCol'>age</div>
      <div className='customerLabel'>ethnicity</div>
      <div className='customerLabel sCol'>size</div>
      <div className='customerLabel sCol'>M</div>
      <div className='customerLabel sCol'>F</div>
      <div className='customerLabel sCol'>0-6</div>
      <div className='customerLabel sCol'>6-17</div>
      <div className='customerLabel sCol'>18-64</div>
      <div className='customerLabel sCol'>65+</div>
    </div>
  );
};

export default CustomerLabels;

