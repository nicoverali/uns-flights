import './index.scss';
import React from 'react';

import PrimaryButton from '@Components/PrimaryButton';
import RadioInput from '@Components/RadioInput';

import SearchIcon from '@Assets/icons/search.svg';
import AirplaneTakeoffIcon from '@Assets/icons/airplane-takeoff.svg';
import AirplaneLandingIcon from '@Assets/icons/airplane-landing.svg';

import LocationInput from './LocationInput';
import DatesInputs from './DatesInputs';

export default class FlightSearchForm extends React.Component {

	constructor(props) {

		super(props);
		this.state = {
			isRoundTrip: false,
			departure: {
				showLocationError: false,
				showDateError: false,
				location: '',
				date: undefined,
			},
			returnn: {
				showLocationError: false,
				showDateError: false,
				location: '',
				date: undefined,
			},
		};

	}

	handleSearchTypeChange = (event) => {

		const isRoundTrip = event.target.value !== 'one-way';
		this.setState({ isRoundTrip });

	};

	handleDepartureLocationChange = (departureLocation) => {

		this.setState((prevState) => ({
			departure: {
				...prevState.departure,
				location: departureLocation,
				showLocationError: false,
			},
		}));

	};

	handleReturnLocationChange = (returnLocation) => {

		this.setState((prevState) => ({
			returnn: {
				...prevState.returnn,
				location: returnLocation,
				showLocationError: false,
			},
		}));

	};

	handleDepartureDateChange = (departureDate) => {

		this.setState((prevState) => ({
			departure: {
				...prevState.departure,
				date: departureDate,
				showDateError: false,
			},
		}));

	};

	handleReturnDateChange = (returnDate) => {

		this.setState((prevState) => ({
			returnn: {
				...prevState.returnn,
				date: returnDate,
				showDateError: false,
			},
		}));

	};

	handleFlightSearchSubmit = (event) => {

		event.preventDefault();
		if (this.props.onFlightsSearchSubmit != null && this.checkStateIsValid()) {

			const { isRoundTrip, departure, returnn } = this.state;
			const { location: depLocation, date: depDate } = departure;
			const { location: retLocation, date: retDate } = returnn;
			this.props.onFlightsSearchSubmit(
				isRoundTrip,
				depLocation,
				depDate,
				retLocation,
				retDate,
			);

		}

	};

	checkStateIsValid() {

		const { isRoundTrip, departure, returnn } = this.state;

		const departureLocationError = departure.location === '';
		const departureDateError = departure.date === undefined;

		const returnLocationError = returnn.location === '';
		const returnDateError = isRoundTrip && returnn.date === undefined;

		this.setState((prevState) => ({
			departure: {
				...prevState.departure,
				showLocationError: departureLocationError,
				showDateError: departureDateError,
			},
			returnn: {
				...prevState.returnn,
				showLocationError: returnLocationError,
				showDateError: returnDateError,
			},
		}));

		return (
			!departureLocationError
			&& !departureDateError
			&& !returnLocationError
			&& !returnDateError
		);

	}

	render() {

		const { isRoundTrip, departure, returnn } = this.state;
		const { locations } = this.props;

		const departureErrorMsg = departure.showLocationError ? 'Ingresa un origen' : '';
		const returnErrorMsg = returnn.showLocationError ? 'Ingresa un destino' : '';

		return (
			<div className={`flight-search-form-component ${this.props.className || ''}`}>
				<form onSubmit={this.handleFlightSearchSubmit}>
					<fieldset className="flight-search-type-fieldset">
						<RadioInput
							name="search-type"
							label="Solo ida"
							value="one-way"
							onChange={this.handleSearchTypeChange}
							checked={!isRoundTrip}
						/>
						<RadioInput
							name="search-type"
							label="Ida y vuelta"
							value="round-trip"
							onChange={this.handleSearchTypeChange}
							checked={isRoundTrip}
						/>
					</fieldset>

					<fieldset className="flight-search-input-fieldsets">
						<LocationInput
							className="flight-search-input"
							locations={locations}
							Icon={AirplaneTakeoffIcon}
							label="Origen"
							errorMsg={departureErrorMsg}
							onLocationChange={this.handleDepartureLocationChange}
						/>
						<LocationInput
							className="flight-search-input"
							locations={locations}
							Icon={AirplaneLandingIcon}
							label="Destino"
							errorMsg={returnErrorMsg}
							onLocationChange={this.handleReturnLocationChange}
						/>
						<DatesInputs
							className="flight-search-input"
							willReturn={isRoundTrip}
							isOnErrorState={departure.showDateError || returnn.showDateError}
							onDepartureUpdate={this.handleDepartureDateChange}
							onReturnUpdate={this.handleReturnDateChange}
						/>
						<PrimaryButton type="submit" className="flight-search-button">
							<SearchIcon />
							BUSCAR
						</PrimaryButton>
					</fieldset>
				</form>
			</div>
		);

	}

}
