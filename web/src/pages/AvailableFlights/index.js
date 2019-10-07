import './index.scss';
import React from 'react';
import FlightsSearchForm from '@Components/FlightSearchForm';

export default class AvailableFlights extends React.Component{


    render(){
        return (
            <div id="available-flights-page">
                <h2 className="available-flights-main-title">Consulta los vuelos disponibles</h2>
                <FlightsSearchForm/>
            </div>
        );
    }
}