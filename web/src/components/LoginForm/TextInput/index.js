import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ className, label, value, isPassword, onChange }) => {

	let type = 'text';
	if (isPassword) {

		type = 'password';

	}
	return (
		<div className={`text-input-component ${className}`}>
			<label htmlFor="text-input">{label}</label>
			<input name="text-input" type={type} value={value} onChange={onChange} />
		</div>
	);

};

TextInput.defaultProps = {
	className: '',
	isPassword: false,
};

TextInput.propTypes = {
	className: PropTypes.string,
	isPassword: PropTypes.bool,
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default TextInput;
