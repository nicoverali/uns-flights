import './index.scss';
import React from 'react';

const PrimaryButton = ({className, ...props}) => {
    let classes = `${className ? className : ''} primary-button ${props.outline ? 'outline' : ''}`;

    return (
        <button className={classes} {...props}>
            {props.children}
        </button>
    )
}

export default PrimaryButton;