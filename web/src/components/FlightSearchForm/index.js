import './index.scss';
import React from 'react';

import RadioInput from './RadioInput';
import LocationFieldset from './LocationFieldset';

export default class FlightSearchForm extends React.Component{

    render(){
        return (
            <div className={`flight-search-form-component ${this.props.className || ''}`}>
                <form>
                    <fieldset className="flight-search-type-fieldset">
                        <RadioInput
                            name="search-type"
                            label="Solo ida"
                        />
                        <RadioInput
                            name="search-type"
                            label="Ida y vuelta"
                        />
                    </fieldset>
                    <LocationFieldset/>
                </form>
            </div>
        );
    }
}