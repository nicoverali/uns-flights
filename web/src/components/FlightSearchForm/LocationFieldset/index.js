import './index.scss';
import React from 'react';
import Autosuggest from 'react-autosuggest';

import IconTextInput from '@Components/FlightSearchForm/IconTextInput';
import SuggestionsContainer from './SuggestionsContainer';
import AirplaneIcon from '@Assets/icons/airplane.svg';
import AirplaneTakeOffIcon from '@Assets/icons/airplane-takeoff.svg';
import AirplaneLandingIcon from '@Assets/icons/airplane-landing.svg';


// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
    {
      name: 'C',
      year: 1972
    },
    {
        name: 'C++',
        year: 1972
      },
      {
        name: 'Clojure',
        year: 1972
      },
      {
        name: 'C#',
        year: 1972
      },
      {
        name: 'Canvas',
        year: 1972
      },
      {
        name: 'Codigofacilito',
        year: 1972
      },
    {
      name: 'Elm',
      year: 2012
    }
  ];
  
  // Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    // TODO This should return an array with all matching suggestions
    return inputLength === 0 ? [] : languages.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
    return []
  };
  
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = suggestion => suggestion.name;
  
  // Use your imagination to render suggestions.
  const renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
  );

export default class LocationFieldset extends React.Component{

    constructor() {
        super();
        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
          fromValue: '',
          fromSuggestions: [],
          toValue: '',
          toSuggestions: []
        };
    }

    onFromChange = (event, { newValue }) => {
        this.setState({
            fromValue: newValue
        });
    };

    onToChange = (event, { newValue }) => {
      this.setState({
          toValue: newValue
      });
  };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onFromSuggestionsFetchRequested = ({ value }) => {
        // TODO This gets called every time the user updates the value, you should return an array with all matching suggestions
        // This behavior is already made in an upper method called 'getSuggestions(value)'
        this.setState({
          fromSuggestions: getSuggestions(value)
        });
    };

    onToSuggestionsFetchRequested = ({ value }) => {
      // TODO This gets called every time the user updates the value, you should return an array with all matching suggestions
      // This behavior is already made in an upper method called 'getSuggestions(value)'
      this.setState({
      toSuggestions: getSuggestions(value)
      });
  };

    // Autosuggest will call this function every time you need to clear suggestions.
    onFromSuggestionsClearRequested = () => {
        this.setState({
          fromSuggestions: []
        });
    };

    onToSuggestionsClearRequested = () => {
      this.setState({
        toSuggestions: []
      });
    };

    handleFromInputBlur = (event) =>{
      if(event.target.value != ''){
        this.setState({fromValue: this.findMatchFor(event.target.value)});
      }
    }

    handleToInputBlur = (event) => {
      if(event.target.value != ''){
        this.setState({toValue: this.findMatchFor(event.target.value)});
      }
    }

    isValidInput(inputValue){
      if(languages.find((lan) => lan.name == inputValue) != undefined){
        return true;
      }
      return false;
    }

    findMatchFor(value){
      if(!this.isValidInput(value)){
        let possibleMatch = languages.find(lan => lan.name.toLowerCase().startsWith(value.toLowerCase()));
        if(possibleMatch != undefined){
          return possibleMatch.name;
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
        // Autosuggest will pass through all these props to the input.
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
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={fromProps}
                    renderInputComponent={IconTextInput}
                    renderSuggestionsContainer={SuggestionsContainer}
                />

                <Autosuggest
                    suggestions={this.state.toSuggestions}
                    onSuggestionsFetchRequested={this.onToSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onToSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={toProps}
                    renderInputComponent={IconTextInput}
                    renderSuggestionsContainer={SuggestionsContainer}
                />
            </fieldset>
        );

    }

}