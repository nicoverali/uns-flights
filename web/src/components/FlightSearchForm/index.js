import './index.scss';
import React from 'react';
import {getAvailableFlightsFor, formatDate} from './AvailableFlightsQueries';

import RadioInput from './RadioInput';
import LocationFieldset from './LocationFieldset';
import DatesFieldset from './DatesFieldset';

import PrimaryButton from '@Components/PrimaryButton';
import SearchIcon from '@Assets/icons/search.svg';

export default class FlightSearchForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isRoundTrip: false,
            fromLocation: '',
            toLocation: '',
            departureDate: undefined,
            returnDate: undefined
        }
    }

    checkStateIsValid(){
        let state = this.state;
        if(state.fromLocation == '' || state.toLocation == ''){
            return false;
        }
        if(state.isRoundTrip){
            return state.departureDate != null && state.returnDate != null;
        }
        else{
            return state.departureDate != null
        }
    }

    handleSearchTypeChange = (event) => {
        let isRoundTrip = event.target.value != 'one-way'
        this.setState({isRoundTrip: isRoundTrip});
        this.props.onIsRoundTripChange(isRoundTrip);
    }

    handleFromLocationChange = (fromLocation) => {
        this.setState({fromLocation: fromLocation});
    }

    handleToLocationChange = (toLocation) => {
        this.setState({toLocation: toLocation});
    }

    handleDepartureUpdate = (departureDate) => {
        this.setState({departureDate: departureDate});
    }

    handleReturnUpdate = (returnDate) => {
        this.setState({returnDate: returnDate});
    }

    handleFlightSearchSubmit = (event) => {
        event.preventDefault();
        if(this.props.onAvailableFlights != null && this.checkStateIsValid){
            
            let fromLocation = this.state.fromLocation.split(',')[0].trim();
            let toLocation = this.state.toLocation.split(',')[0].trim();
            let date = formatDate(this.state.departureDate);
            if(!this.state.isRoundTrip){
                getAvailableFlightsFor(fromLocation, toLocation, date)
                    .then(flights => this.props.onAvailableFlights([flights, undefined]));
            }
            else{
                getAvailableFlightsFor(fromLocation, toLocation, date)
                    .then(goFlights => {
                        let returnDate = formatDate(this.state.returnDate);
                        getAvailableFlightsFor(toLocation, fromLocation, returnDate)
                            .then(backFligts => this.props.onAvailableFlights([goFlights, backFligts]))
                    })
            }
        }
    }

    componentDidCatch(error, info){
        console.error(error + info);
    }

    render(){
        return (
            <div className={`flight-search-form-component ${this.props.className || ''}`}>
                <p>{JSON.stringify(this.state.departureFlights)}</p>
                <form onSubmit={this.handleFlightSearchSubmit}>
                    <fieldset className="flight-search-type-fieldset">
                        <RadioInput
                            name="search-type"
                            label="Solo ida"
                            value="one-way"
                            onChange={this.handleSearchTypeChange}
                            checked={!this.state.isRoundTrip}
                        />  
                        <RadioInput
                            name="search-type"
                            label="Ida y vuelta"
                            value="round-trip"
                            onChange={this.handleSearchTypeChange}
                            checked={this.state.isRoundTrip}
                        />
                    </fieldset>

                    <div className="flight-search-bottom-fieldsets">
                        <LocationFieldset
                            onFromLocationChange={this.handleFromLocationChange}
                            onToLocationChange={this.handleToLocationChange} 
                        />
                        <DatesFieldset className="flight-search-dates-fieldset" 
                            willReturn={this.state.isRoundTrip}
                            onDepartureUpdate={this.handleDepartureUpdate}
                            onReturnUpdate={this.handleReturnUpdate}
                        />
                    </div>

                    <PrimaryButton type="submit" className="flight-search-button"> 
                        <SearchIcon/>
                        BUSCAR
                    </PrimaryButton>
                </form>

            </div>
        );
    }
}