import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';

const FlightEndPoint = ({ className, time, airportCode, airportName }) => (
	<div className={`flight-end-point-component ${className}`}>
		<div className="flight-end-point-top">
			<h3>{time}</h3>
			<h4>{`(${airportCode})`}</h4>
		</div>
		<p>{airportName}</p>
	</div>
);

FlightEndPoint.defaultProps = {
	className: '',
	airportCode: '',
	airportName: '',
};

FlightEndPoint.propTypes = {
	className: PropTypes.string,
	time: PropTypes.string.isRequired,
	airportCode: PropTypes.string,
	airportName: PropTypes.string,
};

export default FlightEndPoint;
