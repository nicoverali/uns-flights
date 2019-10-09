import './index.scss';
import React from 'react';
import logo from '@Assets/images/logo.png';

const BrandLogo = ({size = 'small', ...props}) =>{
    let h1ClassName = props.horizontal ? 'horizontal': '';

    return (
        <div {...props} className={`brand-logo-component ${props.className||''} ${size}`}>
            <img src={logo}/>
            <h1 className={h1ClassName}>UNS Flights</h1>
        </div>
    );

}

export default BrandLogo;