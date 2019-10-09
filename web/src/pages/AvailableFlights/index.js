import './index.scss';
import React from 'react';
import FlightsSearchForm from '@Components/FlightSearchForm';
import FlightsList from '@Components/FlightsList';

import ArrowRight from '@Assets/icons/chevron-right.svg';
import ArrowLeft from '@Assets/icons/chevron-left.svg';

export default class AvailableFlights extends React.Component{


    render(){
        return (
            <div id="available-flights-page">
                <h2 className="available-flights-main-title">Consulta los vuelos disponibles</h2>
                <FlightsSearchForm/>

                <div className="available-flights-list-header">
                    <h2 className="available-flights-main-title">Vuelos de ida</h2>
                    <div className="available-flights-list-arrows">
                        <ArrowLeft className="available-flights-arrow" onClick={()=>console.log('Clicked!!')}/>
                        <ArrowRight className="available-flights-arrow"/>
                    </div>
                </div>

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