import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';

const RadioInput = ({ className, name, label, value, checked, reversed, onChange }) => (
	<label htmlFor={name} className={`radio-input-component ${className}`}>
		<input type="radio" name={name} value={value} checked={checked} onChange={onChange} />
		<span className={`styled-radio ${reversed ? 'reversed' : ''}`} />
		{label}
	</label>
);

RadioInput.defaultProps = {
	className: '',
	reversed: false,
};

RadioInput.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	checked: PropTypes.bool.isRequired,
	reversed: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
};

export default RadioInput;
