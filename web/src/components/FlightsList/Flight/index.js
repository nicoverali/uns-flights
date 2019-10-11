import './index.scss';
import React from 'react';
import FlightEndPoint from './FlightEndPoint';
import FlightInfoItem from './FlightInfoItem';
import FlightClasses from './FlightClasses';
import AirplaneIcon from '@Assets/icons/airplane.svg';
import PrimaryButton from '@Components/PrimaryButton';

export default class Flight extends React.Component{


    formatTime(time){
        let seconds = time.lastIndexOf(':');
        return time.substring(0, seconds);
    }

    render(){

        let flightInfo = this.props.flight.flight;
        let classesInfo = this.props.flight.classes;

        return (
            <div className={`flight-component ${this.props.className||''}`}>
                
                <div className="flight-main-content">
                    <div className="flight-time">
                        <FlightEndPoint className="flight-end-point"
                            time={this.formatTime(flightInfo.hora_sale)}
                            airportCode={flightInfo.a1_codigo}
                            airportName={flightInfo.a1_nombre}
                        />
                        <div className="flight-route">
                            <hr className="flight-route-line"></hr>
                            <AirplaneIcon/>
                        </div>
                        <FlightEndPoint className="flight-end-point"
                            time={this.formatTime(flightInfo.hora_llega)}
                            airportCode={flightInfo.a2_codigo}
                            airportName={flightInfo.a2_nombre}
                        />
                    </div>

                    <div className="flight-info-and-button">
                        <div className="flight-information">
                            <FlightInfoItem 
                                label="Nro vuelo"
                                value={flightInfo.nro_vuelo}
                            />
                            <FlightInfoItem 
                                label="Modelo avion"
                                value={flightInfo.modelo_avion}
                            />
                            <FlightInfoItem 
                                label="Tiempo estimado"
                                value={this.formatTime(flightInfo.tiempo_estimado)}
                            />
                        </div>

                        <PrimaryButton className="flight-button" outline={true} onClick={this.props.onShowClasses}>
                            Ver clases
                        </PrimaryButton>
                    </div>
                </div>

                <FlightClasses className={`flight-classes ${this.props.showClasses ? '':'hide'}`}
                    classes={classesInfo}/>

            </div>
        );

    }

}