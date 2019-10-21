import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';

const Chip = ({ className, label, active, onClick }) => (
	<button
		type="button"
		onClick={onClick}
		className={`chip-component ${className} ${active ? 'active' : ''}`}
	>
		<span>{label}</span>
	</button>
);

Chip.defaultProps = {
	className: '',
	active: false,
	onClick: () => {},
};

Chip.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	active: PropTypes.bool,
	onClick: PropTypes.func,
};

export default Chip;
