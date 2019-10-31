import './index.scss';
import React from 'react';
import {
	getAvailableFlightsFor,
	getAllLocations,
	formatDate,
} from '@Services/AvailableFlightsService';

import FlightsSearchForm from '@Components/FlightSearchForm';
import FlightSelector from '@Components/FlightSelector';
import FlightCheckoutSummary from '@Components/FlightCheckoutSummary';

import AirplaneOffIcon from '@Assets/icons/airplane-off.svg';

// TODO delete this
const departureTest = [
	{
		flight: {
			hora_sale: '8:00:00',
			a1_codigo: 'BCN',
			a1_nombre: 'Barcelona Airport',
			hora_llega: '15:00:00',
			a2_codigo: 'MIA',
			a2_nombre: 'Miami Airport',
			nro_vuelo: 'BC1',
			modelo_avion: 'Boing 777',
			tiempo_estimado: '6:00:00',
		},
		classes: [
			{
				clase: 'Turista',
				asientos_disponibles: '5',
				precio: '3500',
			},
			{
				clase: 'Segunda',
				asientos_disponibles: '54',
				precio: '5000',
			},
			{
				clase: 'Primera',
				asientos_disponibles: '511',
				precio: '8500',
			},
		],
	},
	{
		flight: {
			hora_sale: '8:00:00',
			a1_codigo: 'BCN',
			a1_nombre: 'Barcelona Airport',
			hora_llega: '15:00:00',
			a2_codigo: 'MIA',
			a2_nombre: 'Miami Airport',
			nro_vuelo: 'BC1',
			modelo_avion: 'Boing 777',
			tiempo_estimado: '6:00:00',
		},
		classes: [
			{
				clase: 'Turista',
				asientos_disponibles: '5',
				precio: '3500',
			},
			{
				clase: 'Segunda',
				asientos_disponibles: '54',
				precio: '5000',
			},
			{
				clase: 'Primera',
				asientos_disponibles: '511',
				precio: '8500',
			},
		],
	},
	{
		flight: {
			hora_sale: '8:00:00',
			a1_codigo: 'BCN',
			a1_nombre: 'Barcelona Airport',
			hora_llega: '15:00:00',
			a2_codigo: 'MIA',
			a2_nombre: 'Miami Airport',
			nro_vuelo: 'BC1',
			modelo_avion: 'Boing 777',
			tiempo_estimado: '6:00:00',
		},
		classes: [
			{
				clase: 'Turista',
				asientos_disponibles: '5',
				precio: '3500',
			},
			{
				clase: 'Segunda',
				asientos_disponibles: '54',
				precio: '5000',
			},
			{
				clase: 'Primera',
				asientos_disponibles: '511',
				precio: '8500',
			},
		],
	},
	{
		flight: {
			hora_sale: '8:00:00',
			a1_codigo: 'BCN',
			a1_nombre: 'Barcelona Airport',
			hora_llega: '15:00:00',
			a2_codigo: 'MIA',
			a2_nombre: 'Miami Airport',
			nro_vuelo: 'BC1',
			modelo_avion: 'Boing 777',
			tiempo_estimado: '6:00:00',
		},
		classes: [
			{
				clase: 'Turista',
				asientos_disponibles: '5',
				precio: '3500',
			},
			{
				clase: 'Segunda',
				asientos_disponibles: '54',
				precio: '5000',
			},
			{
				clase: 'Primera',
				asientos_disponibles: '511',
				precio: '8500',
			},
		],
	},
	{
		flight: {
			hora_sale: '8:00:00',
			a1_codigo: 'BCN',
			a1_nombre: 'Barcelona Airport',
			hora_llega: '15:00:00',
			a2_codigo: 'MIA',
			a2_nombre: 'Miami Airport',
			nro_vuelo: 'BC1',
			modelo_avion: 'Boing 777',
			tiempo_estimado: '6:00:00',
		},
		classes: [
			{
				clase: 'Turista',
				asientos_disponibles: '5',
				precio: '3500',
			},
			{
				clase: 'Segunda',
				asientos_disponibles: '54',
				precio: '5000',
			},
			{
				clase: 'Primera',
				asientos_disponibles: '511',
				precio: '8500',
			},
		],
	},
];

const returnTest = [
	{
		flight: {
			hora_sale: '8:00:00',
			a1_codigo: 'BCN',
			a1_nombre: 'Barcelona Airport',
			hora_llega: '15:00:00',
			a2_codigo: 'MIA',
			a2_nombre: 'Miami Airport',
			nro_vuelo: 'BC1',
			modelo_avion: 'Boing 777',
			tiempo_estimado: '6:00:00',
		},
		classes: [
			{
				clase: 'Turista',
				asientos_disponibles: '5',
				precio: '3500',
			},
			{
				clase: 'Segunda',
				asientos_disponibles: '54',
				precio: '5000',
			},
			{
				clase: 'Primera',
				asientos_disponibles: '511',
				precio: '8500',
			},
		],
	},
	{
		flight: {
			hora_sale: '8:00:00',
			a1_codigo: 'BCN',
			a1_nombre: 'Barcelona Airport',
			hora_llega: '15:00:00',
			a2_codigo: 'MIA',
			a2_nombre: 'Miami Airport',
			nro_vuelo: 'BC1',
			modelo_avion: 'Boing 777',
			tiempo_estimado: '6:00:00',
		},
		classes: [
			{
				clase: 'Turista',
				asientos_disponibles: '5',
				precio: '3500',
			},
			{
				clase: 'Segunda',
				asientos_disponibles: '54',
				precio: '5000',
			},
			{
				clase: 'Primera',
				asientos_disponibles: '511',
				precio: '8500',
			},
		],
	},
	{
		flight: {
			hora_sale: '8:00:00',
			a1_codigo: 'BCN',
			a1_nombre: 'Barcelona Airport',
			hora_llega: '15:00:00',
			a2_codigo: 'MIA',
			a2_nombre: 'Miami Airport',
			nro_vuelo: 'BC1',
			modelo_avion: 'Boing 777',
			tiempo_estimado: '6:00:00',
		},
		classes: [
			{
				clase: 'Turista',
				asientos_disponibles: '5',
				precio: '3500',
			},
			{
				clase: 'Segunda',
				asientos_disponibles: '54',
				precio: '5000',
			},
			{
				clase: 'Primera',
				asientos_disponibles: '511',
				precio: '8500',
			},
		],
	},
	{
		flight: {
			hora_sale: '8:00:00',
			a1_codigo: 'BCN',
			a1_nombre: 'Barcelona Airport',
			hora_llega: '15:00:00',
			a2_codigo: 'MIA',
			a2_nombre: 'Miami Airport',
			nro_vuelo: 'BC1',
			modelo_avion: 'Boing 777',
			tiempo_estimado: '6:00:00',
		},
		classes: [
			{
				clase: 'Turista',
				asientos_disponibles: '5',
				precio: '3500',
			},
			{
				clase: 'Segunda',
				asientos_disponibles: '54',
				precio: '5000',
			},
			{
				clase: 'Primera',
				asientos_disponibles: '511',
				precio: '8500',
			},
		],
	},
	{
		flight: {
			hora_sale: '8:00:00',
			a1_codigo: 'BCN',
			a1_nombre: 'Barcelona Airport',
			hora_llega: '15:00:00',
			a2_codigo: 'MIA',
			a2_nombre: 'Miami Airport',
			nro_vuelo: 'BC1',
			modelo_avion: 'Boing 777',
			tiempo_estimado: '6:00:00',
		},
		classes: [
			{
				clase: 'Turista',
				asientos_disponibles: '5',
				precio: '3500',
			},
			{
				clase: 'Segunda',
				asientos_disponibles: '54',
				precio: '5000',
			},
			{
				clase: 'Primera',
				asientos_disponibles: '511',
				precio: '8500',
			},
		],
	},
];

export default class AvailableFlights extends React.Component {

	static areFlightsAvailable(isRoundTrip, departure, returnn) {

		const depFlights = departure.availableFlights;
		const retFlights = returnn.availableFlights;
		if (isRoundTrip) {

			return (
				depFlights !== undefined
				&& depFlights.length > 0
				&& retFlights !== undefined
				&& retFlights.length > 0
			);

		}
		return depFlights !== undefined && depFlights.length > 0;

	}

	constructor(props) {

		super(props);
		this.state = {
			locations: [],
			isRoundTrip: true, // false,
			departure: {
				date: '02/01/2019', // undefined,
				location: 'Barcelona', // undefined,
				availableFlights: departureTest, // undefined,
				selected: undefined,
			},
			returnn: {
				date: '05/01/2020', // undefined,
				location: 'Miami', // undefined,
				availableFlights: returnTest, // undefined,
				selected: undefined,
			},
		};

	}

	componentDidMount() {

		getAllLocations().then((result) => this.setState({ locations: result }));

	}

	handleFlightsSearchSubmit = (isRoundTrip, depLocation, depDate, retLocation, retDate) => {

		const departureLocation = depLocation.split(',')[0].trim();
		const returnLocation = retLocation.split(',')[0].trim();
		const departureDate = formatDate(depDate);
		const returnDate = isRoundTrip ? formatDate(retDate) : null;

		const depRequest = getAvailableFlightsFor(departureLocation, returnLocation, departureDate);
		const retRequest = isRoundTrip
			? getAvailableFlightsFor(returnLocation, departureLocation, returnDate)
			: Promise.resolve([]);

		Promise.all([depRequest, retRequest]).then((availableFlights) => {

			this.setState({
				isRoundTrip,
				departure: {
					date: departureDate,
					location: departureLocation,
					availableFlights: availableFlights[0],
					selected: undefined,
				},
				returnn: {
					date: returnDate,
					location: returnLocation,
					availableFlights: availableFlights[1],
					selected: undefined,
				},
			});

		});

	};

	handleDepartureFlightSelected = (flight) => {

		this.setState((prevState) => ({
			departure: {
				...prevState.departure,
				selected: flight,
			},
		}));

	};

	handleReturnFlightSelected = (flight) => {

		this.setState((prevState) => ({
			returnn: {
				...prevState.returnn,
				selected: flight,
			},
		}));

	};

	handleReservation = () => {

		const { empId } = this.props.location.state;
		const { departure, returnn } = this.state;
		const redirectTo = {
			pathname: '/reservation',
			state: {
				empId,
				departure: {
					date: departure.date,
					location: departure.location,
					flight: departure.selected.flight,
					class: departure.selected.class,
				},
				returnn: {
					date: returnn.date,
					location: returnn.location,
					flight: returnn.selected.flight,
					class: returnn.selected.flight,
				},
			}
		}

		console.log(redirectTo);

	}

	render() {

		const { locations, isRoundTrip, departure, returnn } = this.state;
		const availableFlightsExist = AvailableFlights.areFlightsAvailable(isRoundTrip, departure, returnn);
		const isSelectionMade = departure.selected !== undefined || returnn.selected !== undefined;

		const BottomElement = availableFlightsExist ? (
			<FlightSelector
				className="available-flights-selector"
				departureFlights={departure.availableFlights}
				returnFlights={returnn.availableFlights}
				onDepartureFlightSelected={this.handleDepartureFlightSelected}
				onReturnFlightSelected={this.handleReturnFlightSelected}
			/>
		) : (
			<div className="available-flights-not-found">
				<AirplaneOffIcon />
				<h3>¡ Lo sentimos !</h3>
				<p>No hay vuelos disponibles en la fecha seleccionada</p>
			</div>
		);

		return (
			<div id="available-flights-page" className={isSelectionMade ? 'extended' : ''}>
				<h2 className="available-flights-main-title">Consulta los vuelos disponibles</h2>
				<FlightsSearchForm
					locations={locations}
					onFlightsSearchSubmit={this.handleFlightsSearchSubmit}
				/>

				{departure.availableFlights !== undefined && BottomElement}

				{isSelectionMade && (
					<FlightCheckoutSummary
						isRoundTrip={isRoundTrip}
						departureLocation={departure.location}
						departureDate={departure.date}
						departureFlight={departure.selected}
						returnLocation={returnn.location}
						returnDate={returnn.date}
						returnFlight={returnn.selected}
						onReservateClick={this.handleReservation}
					/>
				)}
			</div>
		);

	}

}
