import './index.scss';
import React from 'react';

const RadioInput = props => {
    return (
        <label {...props} className={`radio-input-component ${props.className || ''}`}>
            <input type="radio" name={props.name}/>
            <span className="styled-radio"></span>
            {props.label}
        </label>
    );
}

export default RadioInput;