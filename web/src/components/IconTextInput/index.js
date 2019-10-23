import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';

const IconTextInput = ({
	id,
	className,
	placeholder,
	error,
	errorMsg,
	disabled,
	valid,
	readOnly,
	onChange,
	onFocus,
	onBlur,
	name,
	label,
	value,
	Icon,
}) => {

	let inputClassNames = '';
	if (error) inputClassNames += 'icon-text-input-error';
	else if (valid) inputClassNames += 'icon-text-input-valid';

	return (
		<div className={`icon-text-input-component ${className}`}>
			{errorMsg !== '' && errorMsg !== undefined && (
				<div className="icon-text-input-error-msg">{errorMsg}</div>
			)}
			<label htmlFor={name}>{label}</label>
			<input
				id={id}
				className={inputClassNames}
				type="text"
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				readOnly={readOnly}
				disabled={disabled}
			/>
			<div className="icon-container">
				<Icon />
			</div>
		</div>
	);

};

IconTextInput.defaultProps = {
	id: '',
	className: '',
	placeholder: '',
	error: false,
	errorMsg: '',
	disabled: false,
	valid: false,
	readOnly: false,
	onChange: () => {},
	onFocus: () => {},
	onBlur: () => {},
};

IconTextInput.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	error: PropTypes.bool,
	errorMsg: PropTypes.string,
	disabled: PropTypes.bool,
	valid: PropTypes.bool,
	readOnly: PropTypes.bool,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,

	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	Icon: PropTypes.func.isRequired,
};

export default IconTextInput;
