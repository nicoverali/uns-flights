import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';

import ArrowRight from '@Assets/icons/chevron-right.svg';
import ArrowLeft from '@Assets/icons/chevron-left.svg';

import FlightsList from './FlightsList';

export default class FlightSelector extends React.Component {

	constructor(props) {

		super(props);
		this.state = { showReturnFlights: false };

	}

	handleShowDepartureList = () => {

		this.setState({ showReturnFlights: false });

	};

	handleShowReturnList = () => {

		this.setState({ showReturnFlights: true });

	};

	render() {

		const { className, departureFlights, returnFlights } = this.props;
		const { showReturnFlights } = this.state;
		const thereAreReturnFLights = returnFlights.length > 0;

		return (
			<div className={`flight-selector-component ${className}`}>
				<div className="flight-selector-header">
					<h2>{showReturnFlights ? 'Vuelos de vuelta' : 'Vuelos de ida'}</h2>
					{thereAreReturnFLights && (
						<div className="flight-selector-arrow-container">
							<ArrowLeft
								className={!showReturnFlights && 'hide'}
								onClick={this.handleShowDepartureList}
							/>
							<ArrowRight
								className={showReturnFlights && 'hide'}
								onClick={this.handleShowReturnList}
							/>
						</div>
					)}
				</div>

				<div
					className={`flight-selector-flights-container ${
						showReturnFlights ? 'show-return' : ''
					}`}
				>
					<FlightsList className="flight-selector-list" flights={departureFlights} />
					{thereAreReturnFLights && (
						<FlightsList className="flight-selector-list" flights={returnFlights} />
					)}
				</div>
			</div>
		);

	}

}

FlightSelector.defaultProps = {
	className: '',
	returnFlights: [],
};

FlightSelector.propTypes = {
	className: PropTypes.string,
	// eslint-disable-next-line react/forbid-prop-types
	departureFlights: PropTypes.array.isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	returnFlights: PropTypes.array,
};
