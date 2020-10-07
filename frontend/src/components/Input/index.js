import React from 'react';

function Input(props) {
  return (
    <label>{props.label}
      <input {...props}/>
    </label>
  )
};

export default Input;