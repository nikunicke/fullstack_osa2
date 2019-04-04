import React from 'react';

const Filter = ({ name, value, eventHandler }) => {
    return (
      <div>
        Search: <input name={name} value={value} onChange={eventHandler} />
      </div>
    )
  }

export default Filter