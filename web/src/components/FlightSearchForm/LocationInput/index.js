import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';

import IconTextInput from '@Components/IconTextInput';
import SuggestionsContainer from './SuggestionsContainer';

function isInputValid(inputValue, locations) {

	const valuesAsArray = inputValue.split(',');
	if (valuesAsArray.length !== 3) return false;

	if (
		locations.find((loc) => (loc.ciudad === valuesAsArray[0].trim()) === undefined)
		|| locations.find((loc) => (loc.estado === valuesAsArray[1].trim()) === undefined)
		|| locations.find((loc) => (loc.pais === valuesAsArray[2].trim()) === undefined)
	) return false;

	return true;

}

function getSuggestionValue(suggestion) {

	return `${suggestion.ciudad}, ${suggestion.estado}, ${suggestion.pais}`;

}

function renderSuggestion(suggestion) {

	return <div className="location-suggestion">{getSuggestionValue(suggestion)}</div>;

}

function findMatchFor(value, locations) {

	if (!isInputValid(value)) {

		const possibleMatch = locations.find((loc) => loc.ciudad.toLowerCase().startsWith(value.toLowerCase().trim()));

		if (possibleMatch !== undefined) {

			return getSuggestionValue(possibleMatch);

		}
		return value;

	}
	return value;

}

export default class LocationInput extends React.Component {

	constructor(props) {

		super(props);
		this.state = {
			inputValue: '',
			inputSuggestions: [],
		};

	}

	onValueChange = (event, { newValue }) => {

		const { locations, onLocationChange } = this.props;
		if (isInputValid(newValue, locations)) {

			onLocationChange(newValue);

		} else {

			onLocationChange('');

		}

		this.setState({ inputValue: newValue });

	};

	onSuggestionsFetchRequested = ({ value }) => {

		const inputValue = value.trim().toLowerCase();
		let suggestions = [];
		if (inputValue.length > 0) {

			const { locations } = this.props;
			suggestions = locations.filter((loc) => {

				if (loc.ciudad.toLowerCase().includes(inputValue.toLowerCase())) return true;
				if (loc.estado.toLowerCase().includes(inputValue.toLowerCase())) return true;
				return false;

			});

		}
		this.setState({ inputSuggestions: suggestions });

	};

	onSuggestionsClearRequested = () => {

		this.setState({ inputSuggestions: [] });

	};

	handleInputBlur = (event) => {

		if (event.target.value !== '') {

			const { locations, onLocationChange } = this.props;
			const match = findMatchFor(event.target.value, locations);
			this.setState({ inputValue: match });
			onLocationChange(match);

		}

	};

	render() {

		const { className, errorMsg, label: inputLabel, Icon: inputIcon, locations } = this.props;
		const { inputValue, inputSuggestions } = this.state;

		const inputProps = {
			Icon: inputIcon,
			label: inputLabel,
			value: inputValue,
			error: !isInputValid(inputValue, locations) && inputValue !== '',
			errorMsg,
			valid: isInputValid(inputValue, locations),
			onChange: this.onValueChange,
			onBlur: this.handleInputBlur,
		};

		return (
			<div className={`location-input-component ${className}`}>
				<Autosuggest
					suggestions={inputSuggestions}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested}
					getSuggestionValue={getSuggestionValue}
					renderSuggestion={renderSuggestion}
					inputProps={inputProps}
					renderInputComponent={IconTextInput}
					renderSuggestionsContainer={SuggestionsContainer}
				/>
			</div>
		);

	}

}

LocationInput.defaultProps = {
	className: '',
	errorMsg: '',
	onLocationChange: () => {},
};

LocationInput.propTypes = {
	className: PropTypes.string,
	errorMsg: PropTypes.string,
	label: PropTypes.string.isRequired,
	Icon: PropTypes.func.isRequired,
	onLocationChange: PropTypes.func,
	locations: PropTypes.arrayOf(
		PropTypes.shape({
			ciudad: PropTypes.string,
			estado: PropTypes.string,
			pais: PropTypes.string,
		}),
	).isRequired,
};
