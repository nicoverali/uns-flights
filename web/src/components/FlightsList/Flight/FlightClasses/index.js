import './index.scss';
import React from 'react';
import FlightClass from './FlightClass';

const FlightClasses = ({classes = [], ...props}) => {
    let reactClasses = [];
    for(let i = 0; i < classes.length; i++){
        reactClasses[i] = (
            <FlightClass key={classes[i].name} name={classes[i].name} availableSeats={classes[i].availableSeats} price={classes[i].price} />
        )
    }
    
    return (
        <div className={`flight-classes-component ${props.className || ''}`}>
            {reactClasses}
        </div>
    )
}


export default FlightClasses;