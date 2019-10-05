import './index.scss';
import React from 'react';
import Logo from '@Assets/images/logo.svg';

const BrandLogo = (props) =>{
    let h1ClassName = props.horizontal ? 'horizontal': '';

    return (
        <div id="brand-logo" {...props}>
            <Logo/>
            <h1 className={h1ClassName}>UNS Flights</h1>
        </div>
    );

}

export default BrandLogo;