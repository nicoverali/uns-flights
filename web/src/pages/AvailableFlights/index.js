import './index.scss';
import React from 'react';
import {
	getAvailableFlightsFor,
	getAllLocations,
	formatDate,
} from '@Services/AvailableFlightsService';

import FlightsSearchForm from '@Components/FlightSearchForm';
import FlightSelector from '@Components/FlightSelector';

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

	constructor(props) {

		super(props);
		this.state = {
			locations: [],
			isRoundTrip: false,
			availableFlights: [departureTest, returnTest], // undefined,
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

			this.setState({ isRoundTrip, availableFlights });

		});

	};

	handleDepartureFlightSelected = (flight) => {
		console.log("Se selecciono origen: ");console.log(JSON.stringify(flight))
	}

	handleReturnFlightSelected = (flight) => {
		console.log("Se selecciono retorno: ");console.log(JSON.stringify(flight))
	}

	render() {

		const { locations, isRoundTrip, availableFlights } = this.state;

		let availableFlightsExist =	availableFlights !== undefined && availableFlights[0].length > 0;
		if (isRoundTrip) {

			availableFlightsExist = availableFlights[1].length > 0;

		}

		const BottomElement = availableFlightsExist ? (
			<FlightSelector
				className="available-flights-selector"
				departureFlights={availableFlights[0]}
				returnFlights={availableFlights[1]}
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
			<div id="available-flights-page">
				<h2 className="available-flights-main-title">Consulta los vuelos disponibles</h2>
				<FlightsSearchForm
					locations={locations}
					onFlightsSearchSubmit={this.handleFlightsSearchSubmit}
				/>

				{this.state.availableFlights !== undefined && BottomElement}
			</div>
		);

	}

}
