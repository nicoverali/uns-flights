import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';

const FlightSummary = ({
	className,
	flightType,
	flightClass,
	departureTime,
	returnTime,
}) => {

	const titleType = flightType === 'departure' ? 'Ida' : 'Vuelta';

	return (
		<div className={`flight-summary-component ${className}`}>
			<p className="flight-summary-title">
				<span>{titleType}</span>
				{' '}
-
				<span>{flightClass}</span>
			</p>
			<h3 className="flight-summary-time">{`${departureTime} - ${returnTime}`}</h3>
		</div>
	);

};

FlightSummary.defaultProps = { className: '' };

FlightSummary.propTypes = {
	className: PropTypes.string,
	flightType: PropTypes.oneOf(['departure', 'return']).isRequired,
	flightClass: PropTypes.string.isRequired,
	departureTime: PropTypes.string.isRequired,
	returnTime: PropTypes.string.isRequired,
};

export default FlightSummary;
