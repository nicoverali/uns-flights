import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SidebarItem = ({ className, linkTo, active, label, onClick }) => {

	const linkClasses = `side-bar-item-component ${className} ${active ? 'active' : ''}`;
	return (
		<Link onClick={onClick} to={linkTo} className={linkClasses}>
			{label}
		</Link>
	);

};

SidebarItem.defaultProps = {
	className: '',
	active: false,
	onClick: () => {},
};

SidebarItem.propTypes = {
	className: PropTypes.string,
	linkTo: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	active: PropTypes.bool,
	onClick: PropTypes.func,
};

export default SidebarItem;
