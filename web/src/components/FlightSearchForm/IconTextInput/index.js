import './index.scss';
import React from 'react';

const IconTextInput = ({icon, label, ...props}) => {
    let reactIcon = '';
    if(icon){
        reactIcon = (<div className="icon-container">
                    {React.createElement(icon)}
                </div>);
    }

    return (
        <div className={`icon-text-input-component ${props.className || ''}`}>
            <label>
                {label}
            </label>
            <input {...props} type="text"/>
            {reactIcon}
        </div>
    );

}

export default IconTextInput;
