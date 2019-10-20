import './index.scss';
import React from 'react';
import logo from '@Assets/images/logo.png';
import logoBig from '@Assets/images/logo-big.png';

const BrandLogo = ({ size = 'small', ...props }) => {

  const h1ClassName = props.horizontal ? 'horizontal' : '';

  return (
    <div {...props} className={`brand-logo-component ${props.className || ''} ${size}`}>
      {size == 'small' ? <img src={logo} /> : <img src={logoBig} />}
      <h1 className={h1ClassName}>UNS Flights</h1>
    </div>
  );

};

export default BrandLogo;
