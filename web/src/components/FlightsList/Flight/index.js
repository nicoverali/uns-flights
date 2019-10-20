import './index.scss';
import React from 'react';
import AirplaneIcon from '@Assets/icons/airplane.svg';
import PrimaryButton from '@Components/PrimaryButton';
import FlightEndPoint from './FlightEndPoint';
import FlightClasses from './FlightClasses';


function formatTime(time) {

	const seconds = time.lastIndexOf(':');
	return time.substring(0, seconds);

}

const Flight = ({
	flight, classes, showClasses, onShowClasses, className,
}) => (

	<div className={`flight-component ${className || ''}`}>
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
					<flightItem label="Nro vuelo" value={flight.nro_vuelo} />
					<flightItem label="Modelo avion" value={flight.modelo_avion} />
					<flightItem
						label="Tiempo estimado"
						value={formatTime(flight.tiempo_estimado)}
					/>
				</div>

				<PrimaryButton
					className="flight-button"
					outline
					onClick={onShowClasses}
				>
					Ver clases
				</PrimaryButton>
			</div>
		</div>

		<FlightClasses
			className={`flight-classes ${showClasses ? '' : 'hide'}`}
			classes={classes}
		/>
	</div>
);

export default Flight;
