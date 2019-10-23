import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';

import AirplaneIcon from '@Assets/icons/airplane.svg';
import PrimaryButton from '@Components/PrimaryButton';
import FlightEndPoint from './FlightEndPoint';
import FlightClass from './FlightClass';
import FlightInfoItem from './FlightInfoItem';

function formatTime(time) {

	const seconds = time.lastIndexOf(':');
	return time.substring(0, seconds);

}

const Flight = ({ flight, classes, showClasses, onShowClasses, className }) => {

	const reactClasses = [];
	for (let i = 0; i < classes.length; i++) {

		// eslint-disable-next-line camelcase
		const { clase, asientos_disponibles, precio } = classes[i];
		reactClasses[i] = (
			<FlightClass
				key={clase}
				name={clase}
				// eslint-disable-next-line camelcase
				availableSeats={asientos_disponibles}
				price={precio}
			/>
		);

	}

	return (
		<div className={`flight-component ${className}`}>
			<div className="flight-main-content">
				<div className="flight-time">
					<FlightEndPoint
						className="flight-end-point"
						time={formatTime(flight.hora_sale)}
						airportCode={flight.a1_codigo}
						airportName={flight.a1_nombre}
					/>
					<div className="flight-route">
						<hr className="flight-route-line" />
						<AirplaneIcon />
					</div>
					<FlightEndPoint
						className="flight-end-point"
						time={formatTime(flight.hora_llega)}
						airportCode={flight.a2_codigo}
						airportName={flight.a2_nombre}
					/>
				</div>

				<div className="flight-info-and-button">
					<div className="flight-information">
						<FlightInfoItem label="Nro vuelo" value={flight.nro_vuelo} />
						<FlightInfoItem label="Modelo avion" value={flight.modelo_avion} />
						<FlightInfoItem
							label="Tiempo estimado"
							value={formatTime(flight.tiempo_estimado)}
						/>
					</div>

					<PrimaryButton className="flight-button" outline onClick={onShowClasses}>
						Ver clases
					</PrimaryButton>
				</div>
			</div>

			<div className={`flight-classes ${showClasses ? '' : 'hide'}`}>{reactClasses}</div>
		</div>
	);

};

Flight.defaultProps = {
	className: '',
	showClasses: false,
	onShowClasses: () => {},
};

Flight.propTypes = {
	className: PropTypes.string,
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

	showClasses: PropTypes.bool,
	onShowClasses: PropTypes.func,
};

export default Flight;
