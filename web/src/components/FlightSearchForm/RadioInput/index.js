import './index.scss';
import React from 'react';

const RadioInput = props => {
    return (
        <label className={`radio-input-component ${props.className || ''}`}>
            <input {...props} type="radio"/>
            <span  className="styled-radio"></span>
            {props.label}
        </label>
    );
}

export default RadioInput;