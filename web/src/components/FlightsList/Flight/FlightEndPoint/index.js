import './index.scss';
import React from 'react';

const FlightEndPoint = (props) => (
  <div className={`flight-end-point-component ${props.className || ''}`}>
    <div className="flight-end-point-top">
      <h3>{props.time}</h3>
      <h4>
(
        {props.airportCode}
)
      </h4>
    </div>
    <p>{props.airportName}</p>
  </div>
);

export default FlightEndPoint;
