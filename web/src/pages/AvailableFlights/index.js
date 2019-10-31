import './index.scss';
import React from 'react';
import Modal from 'react-modal';
import {
	getAvailableFlightsFor,
	getAllLocations,
	formatDate,
} from '@Services/AvailableFlightsService';
import { reserveOneWayTrip, reserveRoundTrip } from '@Services/ReservationService';

import FlightsSearchForm from '@Components/FlightSearchForm';
import FlightSelector from '@Components/FlightSelector';
import FlightCheckoutSummary from '@Components/FlightCheckoutSummary';

import AirplaneOffIcon from '@Assets/icons/airplane-off.svg';
import FlightReservation from '@Components/FlightReservation';

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

Modal.setAppElement(document.getElementById('app'));

const modalCustomStyles = {
	content : {
	  transform             : 'translateX(-50%) translateY(-50%)',
	  left                  : '50%',
	  background			: 'transparent',
	  border				: 'none',
	  inset					: 'unset',
	  padding				: '0',
	}
};

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

	static createResultMessage(reservationState) {
		if(reservationState < 3){
			return (
				<>
					<p className="reservation-result-title">¡ Se realizó la reseva !</p>
					<p className="reservation-result-body">El estado de tu reserva es: <b>{reservationState == 1 ? 'Confirmado' : 'En espera'}</b></p>
				</>
			);
		} else {
			return (
				<>
					<p className="reservation-result-title">No se pudo realizar la reserva</p>
					<p className="reservation-result-body">No hay más asientos disponibles para el vuelo seleccionado</p>
				</>
			)
		}
	}

	static createReservationErrorMessage(){
		return (
			<>
				<p className="reservation-result-title">¡ Lo sentimos !</p>
				<p className="reservation-result-body">Ocurrió un error, por favor vuelva a intentarlo más tarde</p>
			</>
		) 
	}

	constructor(props) {

		super(props);
		this.state = {
			locations: [],
			isModalOpen: false,
			isSummaryOpen: false,
			isReservationProcessing: false,
			lastReservationResult: undefined,
			isRoundTrip: false, // true,
			departure: {
				date: undefined, // '02/01/2019',
				location: undefined, // 'Barcelona',
				availableFlights: undefined, // departureTest,
				selected: undefined,
			},
			returnn: {
				date: undefined, // '05/01/2020',
				location: undefined, // 'Miami',
				availableFlights: undefined, // returnTest,
				selected: undefined,
			},
		};
		/* this.state = {
			locations: [],
			isModalOpen: true,
			isSummaryOpen: false,
			isReservationProcessing: false,
			lastReservationResult: AvailableFlights.createReservationErrorMessage(),
			isRoundTrip: false, // true,
			departure: {
				date: undefined, // '02/01/2019',
				location: undefined, // 'Barcelona',
				availableFlights: undefined, // departureTest,
				selected: {
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
					class: {
							clase: 'Turista',
							asientos_disponibles: '5',
							precio: '3500',
					},
		
				},
			},
			returnn: {
				date: undefined, // '05/01/2020',
				location: undefined, // 'Miami',
				availableFlights: undefined, // returnTest,
				selected: {
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
					class: {
							clase: 'Turista',
							asientos_disponibles: '5',
							precio: '3500',
					},
		
				},
			},
		}; */

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
			isSummaryOpen: true,
			departure: {
				...prevState.departure,
				selected: flight,
			},
		}));

	};

	handleReturnFlightSelected = (flight) => {

		this.setState((prevState) => ({
			isSummaryOpen: true,
			returnn: {
				...prevState.returnn,
				selected: flight,
			},
		}));

	};

	handleReservation = () => {

		this.setState({ isModalOpen: true, isSummaryOpen: false })

	}

	handleModalClose = () => {

		const { isReservationProcessing } = this.state;
		if(!isReservationProcessing){
			this.setState({ lastReservationResult: undefined, isModalOpen: false, isSummaryOpen: true });
		}

	}

	handleReservationFinish = (idType, idNumber) => {

		this.setState({isReservationProcessing: true});
		
		const { isRoundTrip, departure, returnn } = this.state;
		const { empId } = this.props.location.state; 
		let reservationPromise;
		const departureFlight = {
			number: departure.selected.flight.nro_vuelo,
			date: departure.date,
			class: departure.selected.class.clase,
		}
		const passenger = {
			type: idType,
			id: idNumber,
		}
		
		if(isRoundTrip){
			const returnFlight = {
				number: returnn.selected.flight.nro_vuelo,
				date: returnn.date,
				class: returnn.selected.class.clase,
			}
			reservationPromise = reserveRoundTrip(departureFlight, returnFlight, passenger, empId);
		} else {
			reservationPromise = reserveOneWayTrip(departureFlight, passenger, empId);
		}

		reservationPromise.then((result) => {
			const resultMsg = AvailableFlights.createResultMessage(result.state);
			this.setState({ isReservationProcessing: false, lastReservationResult: resultMsg });
			this.handleFlightsSearchSubmit(isRoundTrip, departure.location, departure.date, returnn.location, returnn.date);		
		})
		.catch(() => {
			const errorMsg = AvailableFlights.createReservationErrorMessage();
			this.setState({ isReservationProcessing: false, lastReservationResult: errorMsg });		
		})

	}

	render() {

		const { locations, isModalOpen, isReservationProcessing, lastReservationResult, isSummaryOpen, isRoundTrip, departure, returnn } = this.state;
		const availableFlightsExist = AvailableFlights.areFlightsAvailable(isRoundTrip, departure, returnn);

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
			<div id="available-flights-page" className={isSummaryOpen ? 'extended' : ''}>
				<h2 className="available-flights-main-title">Consulta los vuelos disponibles</h2>
				<FlightsSearchForm
					locations={locations}
					onFlightsSearchSubmit={this.handleFlightsSearchSubmit}
				/>

				{departure.availableFlights !== undefined && BottomElement}

				<FlightCheckoutSummary
					isOpen={isSummaryOpen}
					isRoundTrip={isRoundTrip}
					departureLocation={departure.location}
					departureDate={departure.date}
					departureFlight={departure.selected}
					returnLocation={returnn.location}
					returnDate={returnn.date}
					returnFlight={returnn.selected}
					onReservateClick={this.handleReservation}
				/>

				<Modal
					isOpen={isModalOpen}
					onRequestClose={this.handleModalClose}
					style={modalCustomStyles}
				>
			
					<FlightReservation 
						isRoundTrip={isRoundTrip}
						isLoading={isReservationProcessing}
						result={lastReservationResult}
						departure={departure}
						returnn={returnn}
						onReservation={this.handleReservationFinish}
					/>
				</Modal>
			</div>
		);

	}

}
