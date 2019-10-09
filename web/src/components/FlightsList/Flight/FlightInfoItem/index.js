import './index.scss';
import React from 'react';

const FlightInfoItem = (props) => {

    return (
        <div className={`flight-info-item-component ${props.className||''}`}>
            <p className="flight-info-item-label">{props.label}</p>
            <p className="flight-info-item-value">{props.value}</p>
        </div>
    )

}

export default FlightInfoItem;