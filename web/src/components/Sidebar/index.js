import './index.scss';
import React from 'react';
import BrandLogo from '@Components/BrandLogo';
import SideBarItem from './SidebarItem';

export default class SideBar extends React.Component{

    // TODO receive items as list with the and keep active

    render(){

        return (
            <div className="sidebar-component">
                <BrandLogo className="sidebar-logo"/>
                <div className="side-bar-items">
                    <SideBarItem label="Vuelos disponibles" active/>
                    <SideBarItem label="Consultas"/>
                    <SideBarItem label="Tablas"/>

                </div>
            </div>
        )

    }

}