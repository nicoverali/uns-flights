import './index.scss';
import React from 'react';
import Autosuggest from 'react-autosuggest';
import {getAllLocations} from './Locations';

import IconTextInput from '@Components/FlightSearchForm/IconTextInput';
import SuggestionsContainer from './SuggestionsContainer';
import AirplaneTakeOffIcon from '@Assets/icons/airplane-takeoff.svg';
import AirplaneLandingIcon from '@Assets/icons/airplane-landing.svg';


export default class LocationFieldset extends React.Component{

    constructor() {
        super();
        this.state = {
          locations: [],
          fromValue: '',
          fromSuggestions: [],
          toValue: '',
          toSuggestions: []
        };
    }

    componentDidMount(){
      getAllLocations()
        .then(data => this.setState({locations: data}));
    }

    onFromChange = (event, { newValue }) => {
        if(this.isValidInput(newValue)){
          this.props.onFromLocationChange(newValue);
        }else{
          this.props.onFromLocationChange('');
        }
        this.setState({
            fromValue: newValue
        });
    };

    onToChange = (event, { newValue }) => {
      if(this.isValidInput(newValue)){
        this.props.onToLocationChange(newValue);
      }else{
        this.props.onToLocationChange('');
      }
      this.setState({
          toValue: newValue
      });
    };

    renderSuggestion = (suggestion) => {
      return(
        <div className="location-suggestion">
          {this.getSuggestionValue(suggestion)}
        </div>
      )
    };

    getSuggestionValue = (suggestion) => {
      return `${suggestion.ciudad}, ${suggestion.estado}, ${suggestion.pais}`;
    }


    onFromSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          fromSuggestions: this.getSuggestions(value)
        });
    };

    onToSuggestionsFetchRequested = ({ value }) => {
        this.setState({
        toSuggestions: this.getSuggestions(value)
        });
    };

    getSuggestions(value){
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;

      return inputLength === 0 ? [] : this.state.locations.filter(loc =>{
          if(loc.ciudad.toLowerCase().includes(inputValue.toLowerCase())) return true;
          if(loc.estado.toLowerCase().includes(inputValue.toLowerCase())) return true;
        }
      );
    };

    onFromSuggestionsClearRequested = () => {
        this.setState({ fromSuggestions: [] });
    };

    onToSuggestionsClearRequested = () => {
      this.setState({ toSuggestions: [] });
    };

    handleFromInputBlur = (event) =>{
      if(event.target.value != ''){
        let match = this.findMatchFor(event.target.value);
        if(this.isValidInput(match)){
          this.props.onFromLocationChange(match);
        }else{
          this.props.onFromLocationChange('');
        }
        this.setState({fromValue: match});
      }
    }

    handleToInputBlur = (event) => {
      if(event.target.value != ''){
        let match = this.findMatchFor(event.target.value);
        if(this.isValidInput(match)){
          this.props.onToLocationChange(match);
        }else{
          this.props.onToLocationChange('');
        }
        this.setState({toValue: this.findMatchFor(event.target.value)});
      }
    }

    isValidInput(inputValue){
      let valuesAsArray = inputValue.split(",");
      if(valuesAsArray.length != 3) return false;

      if(this.state.locations.find(loc => loc.ciudad == valuesAsArray[0].trim() == undefined)) return false;
      if(this.state.locations.find(loc => loc.estado == valuesAsArray[1].trim() == undefined)) return false;
      if(this.state.locations.find(loc => loc.pais == valuesAsArray[2].trim() == undefined)) return false;
      
      return true;
    }

    findMatchFor(value){
      if(!this.isValidInput(value)){
        let possibleMatch = this.state.locations.find(loc => loc.ciudad.toLowerCase().startsWith(value.toLowerCase().trim()));
        if(possibleMatch != undefined){
          return this.getSuggestionValue(possibleMatch);
        }
        return value
      }
      return value;
    }

    render(){
        let fromInputValid = this.isValidInput(this.state.fromValue);
        let toInputValid = this.isValidInput(this.state.toValue);

        const fromProps = {
          value: this.state.fromValue,
          onChange: this.onFromChange,
          onBlur: this.handleFromInputBlur,
          icon: AirplaneTakeOffIcon,
          label: "Origen",
          error: !fromInputValid && this.state.fromValue != '',
          valid: fromInputValid
        }
        const toProps = {
          value: this.state.toValue,
            onChange: this.onToChange,
            onBlur: this.handleToInputBlur,
            icon: AirplaneLandingIcon,
            label: "Destino",
            error: !toInputValid && this.state.toValue != '',
            valid: toInputValid
        };

        return (
            <fieldset {...this.props} className={`location-fieldset-component ${this.props.className || ''}`}>
                <Autosuggest
                    suggestions={this.state.fromSuggestions}
                    onSuggestionsFetchRequested={this.onFromSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onFromSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={fromProps}
                    renderInputComponent={IconTextInput}
                    renderSuggestionsContainer={SuggestionsContainer}
                />

                <Autosuggest
                    suggestions={this.state.toSuggestions}
                    onSuggestionsFetchRequested={this.onToSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onToSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={toProps}
                    renderInputComponent={IconTextInput}
                    renderSuggestionsContainer={SuggestionsContainer}
                />
            </fieldset>
        );

    }

}