import './index.scss';
import React from 'react';

const IconTextInput = (props) => {
    let icon;
    if(props.icon){
        icon = (<div className="icon-container">
                    {React.createElement(props.icon)}
                </div>);
    }

    return (
        <div {...props} className={`icon-text-input-component ${props.className || ''}`}>
            <label>
                {props.label}
            </label>
            <input type="text" placeholder={props.placeholder} value={props.value} id={props.inputId} disabled={props.disabled}/>
            {icon}
        </div>
    );

}

export default IconTextInput;
