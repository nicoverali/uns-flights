import './index.scss';
import React from 'react';
import logo from '@Assets/images/logo.png';

const BrandLogo = (props) =>{
    let h1ClassName = props.horizontal ? 'horizontal': '';

    return (
        <div id="brand-logo" {...props}>
            <img src={logo}/>
            <h1 className={h1ClassName}>UNS Flights</h1>
        </div>
    );

}

export default BrandLogo;