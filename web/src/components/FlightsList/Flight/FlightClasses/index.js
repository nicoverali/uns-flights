import './index.scss';
import React from 'react';
import FlightClass from './FlightClass';

const FlightClasses = ({ classes = [], ...props }) => {

  const reactClasses = [];
  for (let i = 0; i < classes.length; i++) {

    reactClasses[i] = (
      <FlightClass
        key={classes[i].clase}
        name={classes[i].clase}
        availableSeats={classes[i].asientos_disponibles}
        price={classes[i].precio}
      />
    );

  }

  return (
    <div className={`flight-classes-component ${props.className || ''}`}>{reactClasses}</div>
  );

};

export default FlightClasses;
