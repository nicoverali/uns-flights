import './index.scss';
import React from 'react';

const IconTextInput = ({
  icon, label, error, valid, ...props
}) => {

  let reactIcon = '';
  if (icon) {

    reactIcon = <div className="icon-container">{React.createElement(icon)}</div>;

  }

  let inputClassNames = '';
  if (error) inputClassNames += 'icon-text-input-error';
  else if (valid) inputClassNames += 'icon-text-input-valid';

  return (
    <div className={`icon-text-input-component ${props.className || ''}`}>
      <label>{label}</label>
      <input {...props} type="text" className={inputClassNames} />
      {reactIcon}
    </div>
  );

};

export default IconTextInput;
