import './index.scss';
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import AirplaneIcon from '@Assets/icons/airplane.svg';
import CloseIcon from '@Assets/icons/close.svg';
import AccountCardIcon from '@Assets/icons/account-card-details.svg';
import NumericIcon from '@Assets/icons/numeric.svg';
import IconTextInput from '@Components/IconTextInput';
import PrimaryButton from '@Components/PrimaryButton';

import {formatTime} from '@Services/AvailableFlightsService';

export default class FlightReservation extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            idTypeValue: '',
            idNumberValue: '',
            idTypeError: '',
            idNumberError: '',
        }
    }

    handleIdTypeChange = (e) => {
        this.setState({idTypeValue: e.target.value, idTypeError:''});
    }

    handleIdNumberChange = (e) => {
        this.setState({idNumberValue: e.target.value, idNumberError:''});
    }

    handleReservation = () => {

        const { idTypeValue, idNumberValue } = this.state;
        let isValid = true;
        if(idTypeValue === ''){
            this.setState({idTypeError: 'Ingresa tu tipo de documento'});
            isValid = false;
        }
        if(idNumberValue === ''){
            this.setState({idNumberError: 'Ingresa tu numero de documento'});
            isValid = false;
        }

        if(isValid){
            this.props.onReservation(idTypeValue, idNumberValue);
        }
    }

    render(){

        const { isRoundTrip, departure, returnn, isLoading, result } = this.props;
        const { idTypeValue, idTypeError, idNumberValue, idNumberError } = this.state;

        return (
            <div className="flight-reservation-component">
                <section className="header">
                    {/* <CloseIcon /> */}
                    <div className="trip">
                        <div className="left">
                            <p className="location-name">{departure.location}</p>
                            <h2 className="flight-reservation-title">{departure.selected.flight.a1_codigo}</h2>
                        </div>
                        <AirplaneIcon />
                        <div className="right">
                            <p className="location-name">{returnn.location}</p>
                            <h2 className="flight-reservation-title">{departure.selected.flight.a2_codigo}</h2>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="reservation-flight-details">
                        <div className="flight-time">
                            <div className="flight-graph-end-point">
                                <p>{departure.selected.flight.a1_codigo}</p>
                                <p>{formatTime(departure.selected.flight.hora_sale)}</p>
                            </div>
                            <div className="flight-route">
                                <hr className="flight-route-line" />
                            </div>
                            <div className="flight-graph-end-point">
                                <p>{departure.selected.flight.a2_codigo}</p>
                                <p>{formatTime(departure.selected.flight.hora_llega)}</p>
                            </div>
                        </div>
                    </div>
                    {isRoundTrip && (
                        <div className="reservation-flight-details">
                            <div className="flight-time">
                                <div className="flight-graph-end-point">
                                    <p>{returnn.selected.flight.a1_codigo}</p>
                                    <p>{formatTime(returnn.selected.flight.hora_sale)}</p>
                                </div>
                                <div className="flight-route">
                                    <hr className="flight-route-line" />
                                </div>
                                <div className="flight-graph-end-point">
                                    <p>{returnn.selected.flight.a2_codigo}</p>
                                    <p>{formatTime(returnn.selected.flight.hora_llega)}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
                <section className="passenger">
                    <div className="background">
                        <IconTextInput 
                            className="input" 
                            name="dni" 
                            label="Tipo de documento" 
                            value={idTypeValue} 
                            errorMsg={idTypeError}
                            Icon={AccountCardIcon} 
                            onChange={this.handleIdTypeChange}/>
                        <IconTextInput 
                            className="input last" 
                            name="dni" 
                            label="Numero de documento" 
                            value={idNumberValue}
                            errorMsg={idNumberError} 
                            Icon={NumericIcon} 
                            onChange={this.handleIdNumberChange}/>

                        <div className="button-section">
                            {isLoading 
                                ? <ClipLoader sizeUnit="px" size={48} color="#FFF" />
                                : (result != undefined 
                                    ? result
                                    : <PrimaryButton onClick={this.handleReservation} className="reservation-button">Reservar</PrimaryButton>)}
                        </div>
                    </div>

                </section>
            </div>
        );

    }

}