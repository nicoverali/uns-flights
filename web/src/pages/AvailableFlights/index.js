import './index.scss';
import React from 'react';
import FlightsSearchForm from '@Components/FlightSearchForm';
import FlightsList from '@Components/FlightsList';

export default class AvailableFlights extends React.Component{


    render(){
        return (
            <div id="available-flights-page">
                <h2 className="available-flights-main-title">Consulta los vuelos disponibles</h2>
                <FlightsSearchForm/>
                <h2 className="available-flights-main-title">Vuelos de ida</h2>
                <FlightsList
                    flights={
                        [   
                            {
                                classes: [{name:'Turista', availableSeats:50, price:1200}]
                            },
                            {
                                classes: [{name:'Turista', availableSeats:50, price:1200}]
                            },
                            {
                                classes: [{name:'Turista', availableSeats:50, price:1200}]
                            },
                            {
                                classes: [{name:'Turista', availableSeats:50, price:1200}]
                            },
                            {
                                classes: [{name:'Turista', availableSeats:50, price:1200}]
                            },
                        ]
                    }
                />
            </div>
        );
    }
}