import React, {useEffect, useState} from 'react';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';

import st            from 'ryscott-st';
import {ax, helpers} from 'util';

const PantryPage = function({pantry}) {
  return (
    <div className='pantryPage h'>
      {pantry.name}
    </div>
  )
};

export default PantryPage;

