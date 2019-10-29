/* eslint-disable react/button-has-type */
import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';

const PrimaryButton = ({ className, type, outline, children, onClick }) => (
	<button
		onClick={onClick}
		type={type}
		className={`primary-button-component ${className || ''} ${outline ? 'outline' : ''}`}
	>
		{children}
	</button>
);

PrimaryButton.defaultProps = {
	className: '',
	type: 'button',
	outline: false,
	onClick: () => {},
};

PrimaryButton.propTypes = {
	className: PropTypes.string,
	type: PropTypes.oneOf(['submit', 'button', 'reset']),
	outline: PropTypes.bool,
	onClick: PropTypes.func,
	children: PropTypes.node.isRequired,
};

export default PrimaryButton;
