import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';

import PrimaryButton from '@Components/PrimaryButton';
import { formatTime } from '@Services/AvailableFlightsService';
import ChevronRightIcon from '@Assets/icons/chevron-right.svg';
import ArrowRightIcon from '@Assets/icons/arrow-right.svg';
import FlightSummary from './FlightSummary';

const FlightCheckoutSummary = ({
	isRoundTrip,
	departureLocation,
	departureDate,
	returnLocation,
	returnDate,
	departureFlight,
	returnFlight,
	onReservateClick,
}) => {

	const departureSection =		departureFlight === undefined ? (
		<p className="flight-checkout-select-msg">Por favor seleccione un viaje de ida</p>
	) : (
		<FlightSummary
			flightType="departure"
			flightClass={departureFlight.class.clase}
			departureTime={formatTime(departureFlight.flight.hora_sale)}
			returnTime={formatTime(departureFlight.flight.hora_llega)}
		/>
	);

	const returnSection =		returnFlight === undefined ? (
		<p className="flight-checkout-select-msg">Por favor seleccione un viaje de vuelta</p>
	) : (
		<FlightSummary
			flightType="return"
			flightClass={returnFlight.class.clase}
			departureTime={formatTime(returnFlight.flight.hora_sale)}
			returnTime={formatTime(returnFlight.flight.hora_llega)}
		/>
	);

	const isReservationAllowed = isRoundTrip
		? departureFlight !== undefined && returnFlight !== undefined
		: departureFlight !== undefined;

	return (
		<div className="flight-checkout-summary-component">
			<div className="flight-checkout-summary-trip">
				<p className="flight-checkout-summary-dates">
					{`${departureDate} ${
						isRoundTrip ? `- ${returnDate}` : ''
					} `}
				</p>
				<h3>{`${departureLocation} - ${returnLocation}`}</h3>
			</div>

			<ChevronRightIcon className="flight-checkout-separator first" />

			{departureSection}

			{isRoundTrip && (
				<>
					<ChevronRightIcon className="flight-checkout-separator" />
					{returnSection}
				</>
			)}

			<PrimaryButton
				onClick={onReservateClick}
				className={`flight-checkout-button ${isReservationAllowed ? '' : 'disabled'}`}
				type="button"
				outline
			>
				<p>Reservar</p>
				{' '}
				<ArrowRightIcon />
			</PrimaryButton>
		</div>
	);

};

const flightPropShape = {
	hora_sale: PropTypes.string.isRequired,
	a1_codigo: PropTypes.string.isRequired,
	a1_nombre: PropTypes.string.isRequired,
	hora_llega: PropTypes.string.isRequired,
	a2_codigo: PropTypes.string.isRequired,
	a2_nombre: PropTypes.string.isRequired,
	nro_vuelo: PropTypes.string.isRequired,
	modelo_avion: PropTypes.string.isRequired,
	tiempo_estimado: PropTypes.string.isRequired,
};

const flightClassPropShape = {
	clase: PropTypes.string.isRequired,
	asientos_disponibles: PropTypes.string.isRequired,
	precio: PropTypes.string.isRequired,
};

FlightCheckoutSummary.defaultProps = {
	returnDate: undefined,
	departureFlight: undefined,
	returnFlight: undefined,
	onReservateClick: () => {},
};

FlightCheckoutSummary.propTypes = {
	isRoundTrip: PropTypes.bool.isRequired,
	departureLocation: PropTypes.string.isRequired,
	returnLocation: PropTypes.string.isRequired,
	departureDate: PropTypes.string.isRequired,
	returnDate: PropTypes.string,
	departureFlight: PropTypes.shape({
		flight: PropTypes.shape(flightPropShape),
		class: PropTypes.shape(flightClassPropShape),
	}),

	returnFlight: PropTypes.shape({
		flight: PropTypes.shape(flightPropShape),
		class: PropTypes.shape(flightClassPropShape),
	}),

	onReservateClick: PropTypes.func,
};

export default FlightCheckoutSummary;
