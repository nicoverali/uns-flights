import './index.scss';
import React from 'react';
import {getAvailableFlightsFor,  getClassesForFlight} from './AvailableFlightsQueries';

import RadioInput from './RadioInput';
import LocationFieldset from './LocationFieldset';
import DatesFieldset from './DatesFieldset';

import PrimaryButton from '@Components/PrimaryButton';
import SearchIcon from '@Assets/icons/search.svg';

export default class FlightSearchForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            searchType: 'one-way',
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
        if(state.searchType == 'one-way'){
            return state.departureDate != null
        }
        else{
            return state.departureDate != null && state.returnDate != null;
        }
    }

    handleSearchTypeChange = (event) => {
        this.setState({searchType: event.target.value});
    }

    handleFromLocationChange = (fromLocation) => {
        console.log("Valor de from: " + fromLocation);
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
        if(this.checkStateIsValid){
            let fromLocation = this.state.fromLocation.split(',')[0].trim();
            let toLocation = this.state.toLocation.split(',')[0].trim();
            let date = `${this.state.departureDate.getFullYear()}-${this.state.departureDate.getMonth()+1}-${this.state.departureDate.getDate()}/`
            getAvailableFlightsFor(fromLocation, toLocation, date)
                .then(data => console.log(JSON.stringify(data)));
        }
    }

    componentDidCatch(error, info){
        console.error(error + info);
    }

    render(){
        return (
            <div className={`flight-search-form-component ${this.props.className || ''}`}>
                
                <form onSubmit={this.handleFlightSearchSubmit}>
                    <fieldset className="flight-search-type-fieldset">
                        <RadioInput
                            name="search-type"
                            label="Solo ida"
                            value="one-way"
                            onChange={this.handleSearchTypeChange}
                            checked={this.state.searchType === 'one-way'}
                        />  
                        <RadioInput
                            name="search-type"
                            label="Ida y vuelta"
                            value="round-trip"
                            onChange={this.handleSearchTypeChange}
                            checked={this.state.searchType === 'round-trip'}
                        />
                    </fieldset>

                    <div className="flight-search-bottom-fieldsets">
                        <LocationFieldset
                            onFromLocationChange={this.handleFromLocationChange}
                            onToLocationChange={this.handleToLocationChange} 
                        />
                        <DatesFieldset className="flight-search-dates-fieldset" 
                            willReturn={this.state.searchType === 'round-trip'}
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