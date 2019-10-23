import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';

const FlightInfoItem = ({ className, label, value }) => (
	<div className={`flight-info-item-component ${className}`}>
		<p className="flight-info-item-label">{label}</p>
		<p className="flight-info-item-value">{value}</p>
	</div>
);

FlightInfoItem.defaultProps = { className: '' };

FlightInfoItem.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
};

export default FlightInfoItem;
