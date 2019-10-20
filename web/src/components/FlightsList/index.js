import './index.scss';
import React from 'react';
import Flight from './Flight';

export default class FlightsList extends React.Component {

	constructor(props) {

		super(props);
		this.state = { openFlight: -1 };

	}

	handleShowClasses = (flightKey) => {

		this.setState({ openFlight: flightKey });

	};

	render() {

		const reactFlights = [];

		// TODO Apply every flight information, and change key
		if (this.props.flights != null) {

			for (let i = 0; i < this.props.flights.length; i++) {

				const flight = this.props.flights[i];
				reactFlights[i] = (
					<Flight
						key={i}
						className="flights-list-item"
						flight={flight}
						onShowClasses={() => this.handleShowClasses(i)}
						showClasses={i === this.state.openFlight}
					/>
				);

			}

		}

		return (
			<div className={`flights-list-component ${this.props.className || ''}`}>
				{reactFlights}
			</div>
		);

	}

}
