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

		if (prevProps !== this.props) {

			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ openFlight: -1 });

		}

	}

	handleShowClasses = (flightKey) => {

		this.setState({ openFlight: flightKey });

	};

	render() {

		const { className, flights } = this.props;
		const reactFlights = [];
		for (let i = 0; i < flights.length; i++) {

			const flight = flights[i];
			reactFlights[i] = (
				<Flight
					key={i}
					className="flights-list-item"
					flight={flight.flight}
					classes={flight.classes}
					onShowClasses={() => this.handleShowClasses(i)}
					showClasses={i === this.state.openFlight}
				/>
			);

		}

		return <div className={`flights-list-component ${className}`}>{reactFlights}</div>;

	}

}

FlightsList.defaultProps = { className: '' };

FlightsList.propTypes = {
	className: PropTypes.string,
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
