import './index.scss';
import React from 'react';

const TextInput = (props) => {

  let type = 'text';
  if (props.password) {

    type = 'password';

  }
  return (
    <div {...props} className={`text-input-component ${props.className || ''}`}>
      <label>{props.label}</label>
      <input type={type} value={props.value} onChange={props.onChange} />
    </div>
  );

};

export default TextInput;
