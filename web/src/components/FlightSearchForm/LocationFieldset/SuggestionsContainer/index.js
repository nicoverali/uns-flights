import './index.scss';
import React from 'react';

const SuggestionsContainer = (props) => {

    return (
        <div {...props.containerProps} className={`suggestions-container-component ${props.containerProps.className || props.className || ''}`}>
            {props.children}
        </div>
    )

}

export default SuggestionsContainer;