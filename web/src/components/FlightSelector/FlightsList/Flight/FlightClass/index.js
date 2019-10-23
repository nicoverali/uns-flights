import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';

const FlightClass = ({ className, name, availableSeats, price }) => (
	<div className={`flight-class-component ${className}`}>
		<section className="left">
			<h5 className="flight-class-name">{name}</h5>
			<p className="flight-class-available-seats">
				{`${availableSeats} asientos disponibles`}
			</p>
		</section>
		<p className="flight-class-price">{`$ ${price}`}</p>
	</div>
);

FlightClass.defaultProps = { className: '' };

FlightClass.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string.isRequired,
	availableSeats: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
};

export default FlightClass;
