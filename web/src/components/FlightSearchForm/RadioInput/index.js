import './index.scss';
import React from 'react';

const RadioInput = ({ className, ...props }) => (
  <label className={`radio-input-component ${className || ''}`}>
    <input {...props} type="radio" />
    <span className={`styled-radio ${props.reversed ? 'reversed' : ''}`} />
    {props.label}
  </label>
);

export default RadioInput;
