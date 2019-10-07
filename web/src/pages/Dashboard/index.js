import './index.scss';
import React from 'react';
import {MemoryRouter, Route, Redirect} from 'react-router-dom';

import SideBar from '@Components/Sidebar';
import AvailableFlights from '@Pages/AvailableFlights';

export default class Dashboard extends React.Component{

    constructor(props) {
        super(props);
        this.state = {arrivePath: props.location.pathname}
    }


    render(){
        return (
            <div id="dashboard-page">
                <Redirect to={`${this.state.arrivePath}/available-flights`}/>
                <SideBar className="dashboard-sidebar"/>
                <div className="dashboard-content">
                    <Route path={`${this.state.arrivePath}/available-flights`} component={AvailableFlights}/>
                </div> 
            </div>
        );
    }

}