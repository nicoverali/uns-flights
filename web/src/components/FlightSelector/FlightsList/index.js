import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Flight from './Flight';

export default class FlightsList extends React.Component {

	constructor(props) {

		super(props);
		this.state = { openFlight: -1 };

	}

	componentDidUpdate(prevProps) {

		if (prevProps.flights !== this.props.flights) {

			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ openFlight: -1 });

		}

	}

	handleShowClasses = (flightKey) => {

		this.setState(({ openFlight }) => ({ openFlight: openFlight === flightKey ? -1 : flightKey }));

	};

	render() {

		const { className, flights, onFlightSelected } = this.props;
		const { openFlight } = this.state;
		const reactFlights = flights.map((flight, index) => (
			<Flight
				// eslint-disable-next-line react/no-array-index-key
				key={index}
				className="flights-list-item"
				flight={flight.flight}
				classes={flight.classes}
				onShowClasses={() => this.handleShowClasses(index)}
				onSelected={onFlightSelected}
				showClasses={index === openFlight}
			/>
		));

		return <div className={`flights-list-component ${className}`}>{reactFlights}</div>;

	}

}

FlightsList.defaultProps = { className: '', onFlightSelected: () => {} };

FlightsList.propTypes = {
	className: PropTypes.string,
	onFlightSelected: PropTypes.func,
	flights: PropTypes.arrayOf(
		PropTypes.shape({
			flight: PropTypes.shape({
				hora_sale: PropTypes.string.isRequired,
				a1_codigo: PropTypes.string.isRequired,
				a1_nombre: PropTypes.string.isRequired,
				hora_llega: PropTypes.string.isRequired,
				a2_codigo: PropTypes.string.isRequired,
				a2_nombre: PropTypes.string.isRequired,
				nro_vuelo: PropTypes.string.isRequired,
				modelo_avion: PropTypes.string.isRequired,
				tiempo_estimado: PropTypes.string.isRequired,
			}).isRequired,

			classes: PropTypes.arrayOf(
				PropTypes.shape({
					clase: PropTypes.string.isRequired,
					asientos_disponibles: PropTypes.string.isRequired,
					precio: PropTypes.string.isRequired,
				}),
			).isRequired,
		}),
	).isRequired,
};
