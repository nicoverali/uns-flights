import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';

const IconTextInput = ({

	id,
	className,
	placeholder,
	error,
	disabled,
	valid,
	readOnly,
	onChange,
	onFocus,
	name,
	label,
	value,
	icon,

}) => {

	const reactIcon = <div className="icon-container">{React.createElement(icon)}</div>;

	let inputClassNames = '';
	if (error) inputClassNames += 'icon-text-input-error';
	else if (valid) inputClassNames += 'icon-text-input-valid';

	return (
		<div className={`icon-text-input-component ${className}`}>
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
				readOnly={readOnly}
				disabled={disabled}
			/>
			{reactIcon}
		</div>
	);

};

IconTextInput.defaultProps = {
	id: '',
	className: '',
	placeholder: '',
	error: false,
	disabled: false,
	valid: false,
	readOnly: false,
	onChange: () => {},
	onFocus: () => {},
};

IconTextInput.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	error: PropTypes.bool,
	disabled: PropTypes.bool,
	valid: PropTypes.bool,
	readOnly: PropTypes.bool,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,

	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	icon: PropTypes.element.isRequired,
};

export default IconTextInput;
