import './index.scss';
import React from 'react';

const FlightClass = (props) => (
	<div className="flight-class-component">
		<section className="left">
			<h5 className="flight-class-name">{props.name}</h5>
			<p className="flight-class-available-seats">
				{props.availableSeats}
				{' '}
asientos disponibles
			</p>
		</section>
		<p className="flight-class-price">
$
			{props.price}
		</p>
	</div>
);

export default FlightClass;
