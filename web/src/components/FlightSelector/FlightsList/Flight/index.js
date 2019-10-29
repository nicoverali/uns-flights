import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';

import AirplaneIcon from '@Assets/icons/airplane.svg';
import ArrowIcon from '@Assets/icons/chevron-right.svg';
import PrimaryButton from '@Components/PrimaryButton';
import FlightEndPoint from './FlightEndPoint';
import FlightInfoItem from './FlightInfoItem';

function formatTime(time) {

	const seconds = time.lastIndexOf(':');
	return time.substring(0, seconds);

}

function handleClassSelected(flight, classes, className, callback) {

	const selected = {
		flight,
		class: classes.find((c) => c.clase === className),
	};
	callback(selected);

}

const Flight = ({ flight, classes, showClasses, onShowClasses, onSelected, className }) => {

	const reactClasses = classes.map((c) => (

		<div key={c.clase} className="flight-class">
			<section className="left">
				<h5 className="flight-class-name">{c.clase}</h5>
				<p className="flight-class-available-seats">
					{`${c.asientos_disponibles} asientos disponibles`}
				</p>
			</section>
			<p className="flight-class-price">{`$ ${c.precio}`}</p>
			<PrimaryButton
				className="flight-class-select-button"
				onClick={() => handleClassSelected(flight, classes, c.clase, onSelected)}
			>
				Seleccionar
			</PrimaryButton>
		</div>

	));

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
						<FlightInfoItem className="flight-info-item" label="Nro vuelo" value={flight.nro_vuelo} />
						<FlightInfoItem className="flight-info-item" label="Modelo avion" value={flight.modelo_avion} />
						<FlightInfoItem
							className="flight-info-item"
							label="Tiempo estimado"
							value={formatTime(flight.tiempo_estimado)}
						/>
					</div>

					<button type="button" className={`flight-button ${showClasses ? 'open' : ''}`} onClick={onShowClasses}>
						<p>Ver clases</p>
						<ArrowIcon />
					</button>
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
	onSelected: () => {},
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
	onSelected: PropTypes.func,
};

export default Flight;
