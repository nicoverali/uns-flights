import './index.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const SidebarItem = ({ linkTo, active, ...props }) => {

  const className = `side-bar-item-component ${props.className || ''} ${active ? 'active' : ''}`;
  let item;

  if (linkTo != null) {

    item = (
      <Link {...props} to={linkTo} className={className}>
        {props.label}
      </Link>
    );

  } else {

    item = (
      <a {...props} className={className}>
        {props.label}
      </a>
    );

  }

  return item;

};

export default SidebarItem;
