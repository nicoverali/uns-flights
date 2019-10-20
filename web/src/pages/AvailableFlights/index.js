import './index.scss';
import React from 'react';
import FlightsSearchForm from '@Components/FlightSearchForm';
import FlightsList from '@Components/FlightsList';

import ArrowRight from '@Assets/icons/chevron-right.svg';
import ArrowLeft from '@Assets/icons/chevron-left.svg';

export default class AvailableFlights extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      availableFlights: undefined,
      isRoundTrip: false,
      showingReturnFlights: false,
    };

  }

    handleAvailableFlights = (flights) => {

      this.setState({ availableFlights: flights, showingReturnFlights: false });

    };

    handleIsRoundTripChange = (isRoundTrip) => {

      this.setState({ isRoundTrip });

    };

    handleArrowsClick = () => {

      this.setState({ showingReturnFlights: !this.state.showingReturnFlights });

    };

    render() {

      const flightSelectionArrows = this.state.isRoundTrip ? (
        <div className="flight-arrow-container">
          <ArrowLeft className="available-flights-arrow" onClick={this.handleArrowsClick} />
          <ArrowRight className="available-flights-arrow" onClick={this.handleArrowsClick} />
        </div>
      ) : (
        ''
      );

      return (
        <div id="available-flights-page">
          <h2 className="available-flights-main-title">Consulta los vuelos disponibles</h2>
          <FlightsSearchForm
            onAvailableFlights={this.handleAvailableFlights}
            onIsRoundTripChange={this.handleIsRoundTripChange}
          />

          {this.state.availableFlights != undefined && (
            <div className="available-flights-container">
              <div className="available-flights-list-header">
                <h2 className="available-flights-main-title">
                  {this.state.showingReturnFlights ? 'Vuelos de vuelta' : ' Vuelos de ida'}
                </h2>
                <div className="available-flights-list-arrows">
                  {flightSelectionArrows}
                </div>
              </div>

              <FlightsList
                flights={
                    this.state.showingReturnFlights
                      ? this.state.availableFlights[1]
                      : this.state.availableFlights[0]
                }
              />
            </div>
          )}
        </div>
      );

    }

}
