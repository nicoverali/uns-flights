/* eslint-disable react/jsx-props-no-spreading */
import './index.scss';
import React from 'react';

const SuggestionsContainer = (props) => (
	<div
		{...props.containerProps}
		className={`suggestions-container-component ${props.containerProps.className
			|| props.className
			|| ''}`}
	>
		{props.children}
	</div>
);

export default SuggestionsContainer;
