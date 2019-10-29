import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';
import logo from '@Assets/images/logo.png';
import logoBig from '@Assets/images/logo-big.png';

const BrandLogo = (props) => {

	const h1ClassName = props.horizontal ? 'horizontal' : '';

	return (
		<div className={`brand-logo-component ${props.className} ${props.size}`}>
			{props.size === 'small' ? (
				<img src={logo} alt="Brand logo." />
			) : (
				<img src={logoBig} alt="Brand logo." />
			)}
			<h1 className={h1ClassName}>UNS Flights</h1>
		</div>
	);

};

BrandLogo.defaultProps = {
	className: '',
	horizontal: false,
	size: 'small',
};

BrandLogo.propTypes = {
	className: PropTypes.string,
	horizontal: PropTypes.bool,
	size: PropTypes.oneOf(['small', 'big']),
};

export default BrandLogo;
