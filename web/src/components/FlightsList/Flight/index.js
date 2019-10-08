import './index.scss';
import React from 'react';
import FlightEndPoint from './FlightEndPoint';
import FlightInfoItem from './FlightInfoItem';
import FlightClasses from './FlightClasses';
import AirplaneIcon from '@Assets/icons/airplane.svg';
import PrimaryButton from '@Components/PrimaryButton';

export default class Flight extends React.Component{

    render(){

        return (
            <div className={`flight-component ${this.props.className||''}`}>
                
                <div className="flight-main-content">
                    <div className="flight-time">
                        <FlightEndPoint className="flight-end-point"
                            time="08:00"
                            airportCode="BCN"
                            airportName="Wiloxx Fox"
                        />
                        <div className="flight-route">
                            <hr className="flight-route-line"></hr>
                            <AirplaneIcon/>
                        </div>
                        <FlightEndPoint className="flight-end-point"
                            time="14:30"
                            airportCode="MIA"
                            airportName="Wiloxx Fox"
                        />
                    </div>

                    <div className="flight-info-and-button">
                        <div className="flight-information">
                            <FlightInfoItem 
                                label="Nro vuelo"
                                value="AC9217"
                            />
                            <FlightInfoItem 
                                label="Nro vuelo"
                                value="AC9217"
                            />
                            <FlightInfoItem 
                                label="Nro vuelo"
                                value="AC9217"
                            />
                        </div>

                        <PrimaryButton className="flight-button" outline={true} onClick={this.props.onShowClasses}>
                            Ver clases
                        </PrimaryButton>
                    </div>
                </div>

                <FlightClasses className={`flight-classes ${this.props.showClasses ? '':'hide'}`}
                    classes={[{name:'Turista', availableSeats:44, price:1200}, {name:'Ejecutivo', availableSeats:11, price:8000}]}/>

            </div>
        );

    }

}