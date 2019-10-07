import './index.scss';
import React from 'react';

import IconTextInput from '@Components/FlightSearchForm/IconTextInput'
import CalendarIcon from '@Assets/icons/calendar.svg'

import {DayPicker, DateUtils} from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import es from './localization';


export default class DatesFieldset extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			departureInputValue: "",
			departureDate: undefined,
			returnInputValue: "",
			returnDate: undefined
		}
	}

	moveDayPicker = event => {
		document.getElementsByClassName('dates-fieldset-component-day-picker')[0].style.left = event.target.offsetParent.offsetLeft + 'px';
	};

	handleDaySelect = selection => {
		if(this.state.departureDate === undefined || !this.props.willReturn){
			this.setDeparture(selection);
			document.getElementById('dates-fieldset-component-input-return').focus();
		}
		else if(this.state.returnDate === undefined){
			if(DateUtils.isDayBefore(selection, this.state.departureDate)){
				this.setReturn(this.state.departureDate);
				this.setDeparture(selection);
			}
			else{
				this.setReturn(selection);
			}
		}
		else{
			this.setDeparture(selection);
			this.setReturn(undefined);
			document.getElementById('dates-fieldset-component-input-return').focus();
		}
	}

	formatDate(date){
		return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
	}

	setDeparture(departureDate){
		let newDeparture = {
			departureDate: departureDate,
			departureInputValue: departureDate != undefined ? this.formatDate(departureDate) : ''
		}
		this.setState(newDeparture);
		if(this.props.onDepartureUpdate != null)
			this.props.onDepartureUpdate(departureDate);
	}

	setReturn(returnDate){
		let newReturn = {
			returnDate: returnDate,
			returnInputValue: returnDate != undefined ? this.formatDate(returnDate) : ''
		}
		this.setState(newReturn);
		if(this.props.onReturnUpdate != null)
			this.props.onReturnUpdate(returnDate);
	}


	render(){
		const modifiers = {
			highlighted: {
				from: this.state.departureDate, 
				to: this.state.returnDate
			},
			disabled: {
				before: new Date()
			} 
		}

		return (
			<fieldset {...this.props} className={`dates-fieldset-component ${this.props.className || ''}`}>
				<IconTextInput inputId="dates-fieldset-component-input-departure" className="date-text-input" 
					placeholder="-- / -- / --"
					icon={CalendarIcon}
					name="departure" 
					label="Fecha de salida" 
					value={this.state.departureInputValue} 
					onFocus={this.moveDayPicker}
					/>

				<IconTextInput inputId="dates-fieldset-component-input-return" className="date-text-input" 
					placeholder="-- / -- / --"
					icon={CalendarIcon}
					name="return" 
					label="Fecha de retorno" 
					value={this.state.returnInputValue}  
					onFocus={this.moveDayPicker}
					disabled={!this.props.willReturn}
					/>

				<DayPicker className="dates-fieldset-component-day-picker"
					onDayClick={this.handleDaySelect}
					selectedDays={[this.state.departureDate, this.state.returnDate]}
					modifiers={modifiers}
					months={es.months}
					weekdaysLong={es.weekdaysLong}
					weekdaysShort={es.weekdaysShort}
				/>
			</fieldset>
		)
	}
}