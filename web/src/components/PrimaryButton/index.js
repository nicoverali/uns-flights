import './index.scss';
import React from 'react';

const PrimaryButton = ({type, outline, className, ...props}) => {
    return (
        <button type={type} className={`primary-button-component ${className||''} ${outline ? 'outline':''}`} >
            
            {props.children}
        
        </button>
    )
}

export default PrimaryButton;