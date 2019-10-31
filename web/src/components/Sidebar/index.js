import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';
import BrandLogo from '@Components/BrandLogo';
import SidebarItem from './SidebarItem';

export default class SideBar extends React.Component {

	constructor(props) {

		super(props);
		const initialActiveLink = props.links.length > 0 ? props.links[0].label : '';
		this.state = { activeItem: initialActiveLink };

	}

	handleItemSelected = (itemName) => {

		this.setState({ activeItem: itemName });

	};

	render() {

		const items = [];
		for (let i = 0; i < this.props.links.length; i++) {

			const link = this.props.links[i];

			items.push(
				<SidebarItem
					key={link.label}
					linkTo={link.to}
					label={link.label}
					onClick={() => this.handleItemSelected(link.label)}
					active={this.state.activeItem === link.label}
				/>,
			);

		}

		return (
			<div className={`sidebar-component ${this.props.className}`}>
				<div className="sidebar-logo">
					<BrandLogo className="sidebar-logo" />
				</div>
				<div className="side-bar-items">{items}</div>
			</div>
		);

	}

}

SideBar.defaultProps = {
	className: '',
	links: [],
};

SideBar.propTypes = {
	className: PropTypes.string,
	links: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			to: PropTypes.oneOfType([
					PropTypes.string,
					PropTypes.shape({
						pathname: PropTypes.string.isRequired,
						state: PropTypes.object
					})
			]),
		}),
	),
};
