import './index.scss';
import React from 'react';

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
            departureDate: undefined,
            returnDate: undefined
        }
    }


    handleSearchTypeChange = (event) => {
        this.setState({searchType: event.target.value});
    }

    handleDepartureUpdate = (departureDate) => {
        this.setState({departureDate: departureDate});
    }

    handleReturnUpdate = (returnDate) => {
        this.setState({returnDate: returnDate});
    }

    render(){
        return (
            <div className={`flight-search-form-component ${this.props.className || ''}`}>
                
                <form>
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
                        <LocationFieldset/>
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