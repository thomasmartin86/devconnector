import React from 'react';
import spinner from '../../img/loading_minisite.gif';

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: '100px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </div>
  );
};
