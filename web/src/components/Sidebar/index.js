import './index.scss';
import React from 'react';
import BrandLogo from '@Components/BrandLogo';
import SidebarItem from './SidebarItem';

export default class SideBar extends React.Component{

    // TODO receive items as list with the and keep active

    render(){

        return (
            <div {...this.props} className={`sidebar-component ${this.props.className || ''}`}>
                <BrandLogo className="sidebar-logo"/>
                <div className="side-bar-items">
                    <SidebarItem label="Vuelos disponibles" active/>
                    <SidebarItem label="Consultas"/>
                    <SidebarItem label="Tablas"/>
                </div>
            </div>
        )

    }

}