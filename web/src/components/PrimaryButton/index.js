import './index.scss';
import React from 'react';

const PrimaryButton = (props) => {
    return (
        <button {...props} 
            className={`primary-button-component ${props.className||''} ${props.outline ? 'outline':''}`} >
            
            {props.children}
        
        </button>
    )
}

export default PrimaryButton;