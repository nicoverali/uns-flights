import './index.scss';
import React from 'react';

import IconTextInput from '@Components/IconTextInput';
import CalendarIcon from '@Assets/icons/calendar.svg';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import langEsp from './localization';

function formatDate(date) {

	return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

}

export default class DatesInputs extends React.Component {

	// eslint-disable-next-line react/sort-comp
	static DEPARTURE_INPUT_NAME = 'departure';

	static RETURN_INPUT_NAME = 'return';

	constructor(props) {

		super(props);
		this.state = {
			focusInput: undefined,
			departure: {
				inputValue: '',
				date: undefined,
			},
			returnn: {
				inputValue: '',
				date: undefined,
			},
		};

	}

	componentDidUpdate() {

		const { willReturn } = this.props;
		const { returnn } = this.state;

		if (!willReturn && returnn.date !== undefined) {

			this.setReturn(undefined);

		}

	}

	setDeparture(departureDate) {

		const { onDepartureUpdate } = this.props;
		const departure = {
			inputValue: departureDate !== undefined ? formatDate(departureDate) : '',
			date: departureDate,
		};
		this.setState({ departure });

		if (onDepartureUpdate !== null) onDepartureUpdate(departureDate);

	}

	setReturn(returnDate) {

		const { onReturnUpdate } = this.props;
		const returnn = {
			inputValue: returnDate !== undefined ? formatDate(returnDate) : '',
			date: returnDate,
		};
		this.setState({ returnn });

		if (onReturnUpdate != null) onReturnUpdate(returnDate);

	}

	moveDayPicker = (event) => {

		const focusInput = event.target.name;
		const dayPicker = document.getElementsByClassName('dates-fieldset-component-day-picker')[0];

		dayPicker.style.left = focusInput === DatesInputs.DEPARTURE_INPUT_NAME ? '0px' : '50%';
		this.setState({ focusInput });

	};

	handleDaySelect = (selection) => {

		const { focusInput, departure, returnn } = this.state;

		if (
			focusInput === DatesInputs.DEPARTURE_INPUT_NAME
			&& departure.date === undefined
			&& returnn.date !== undefined
			&& selection.getTime() <= returnn.date.getTime()
		) {

			this.setDeparture(selection);

		} else if (focusInput === DatesInputs.DEPARTURE_INPUT_NAME) {

			this.setDeparture(selection);
			this.setReturn(undefined);
			document.getElementById('dates-fieldset-component-input-return').focus();

		} else if (selection.getTime() < departure.date.getTime()) {

			this.setDeparture(undefined);
			this.setReturn(selection);
			document.getElementById('dates-fieldset-component-input-departure').focus();

		} else {

			this.setReturn(selection);

		}

	};

	render() {

		const { className, willReturn, isOnErrorState } = this.props;
		const { departure, returnn } = this.state;

		const modifiers = {
			highlighted: {
				from: departure.date,
				to: returnn.date,
			},
			returnDate: returnn.date,
			disabled: { before: new Date() },
		};

		let departureErrorMsg = '';
		let returnErrorMsg = '';
		if (isOnErrorState) {

			departureErrorMsg = departure.date === undefined ? 'Ingresa una fecha de salida' : '';
			returnErrorMsg =				willReturn && returnn.date === undefined ? 'Ingresa una fecha de retorno' : '';

		}

		return (
			<div className={`dates-fieldset-component ${className || ''}`}>
				<IconTextInput
					id="dates-fieldset-component-input-departure"
					className="date-text-input"
					placeholder="-- / -- / --"
					Icon={CalendarIcon}
					name={DatesInputs.DEPARTURE_INPUT_NAME}
					value={departure.inputValue}
					label="Fecha de salida"
					valid={departure.date !== undefined}
					errorMsg={departureErrorMsg}
					onFocus={this.moveDayPicker}
					readOnly
				/>

				<IconTextInput
					id="dates-fieldset-component-input-return"
					className="date-text-input"
					placeholder="-- / -- / --"
					Icon={CalendarIcon}
					name={DatesInputs.RETURN_INPUT_NAME}
					value={returnn.inputValue}
					label="Fecha de retorno"
					valid={returnn.date !== undefined}
					errorMsg={returnErrorMsg}
					disabled={!willReturn}
					onFocus={this.moveDayPicker}
					readOnly
				/>

				<DayPicker
					className="dates-fieldset-component-day-picker"
					onDayClick={this.handleDaySelect}
					selectedDays={[departure.date, returnn.date]}
					modifiers={modifiers}
					months={langEsp.months}
					weekdaysLong={langEsp.weekdaysLong}
					weekdaysShort={langEsp.weekdaysShort}
				/>
			</div>
		);

	}

}
