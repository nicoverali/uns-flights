import './index.scss';
import React from 'react';
import {Link} from 'react-router-dom';

const SideBarItem = props => {
    let className = `side-bar-item-component ${props.className || ''}`;
    if(props.active){
        className += 'active';
    }

    return (
        <Link to={props.linkTo} className={className}>
            {props.label}
        </Link>
    );

}

export default SideBarItem;