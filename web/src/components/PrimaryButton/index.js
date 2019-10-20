import './index.scss';
import React from 'react';

const PrimaryButton = ({
  type, outline, className, ...props
}) => (
  <button
    {...props}
    type={type}
    className={`primary-button-component ${className || ''} ${outline ? 'outline' : ''}`}
  >
    {props.children}
  </button>
);

export default PrimaryButton;
