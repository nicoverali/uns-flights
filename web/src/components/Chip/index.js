import './index.scss';
import React from 'react';

const Chip = (props) => {

    return (
        <div onClick={props.onClick} className={`chip-component ${props.className||''} ${props.active ? 'active': ''}`}>
            <span>{props.label}</span>
        </div>
    )

}

export default Chip;