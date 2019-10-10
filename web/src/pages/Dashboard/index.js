import './index.scss';
import React from 'react';
import {Route, Redirect,  withRouter} from 'react-router-dom';
import QueryString from 'query-string';

import SideBar from '@Components/Sidebar';
import AvailableFlights from '@Pages/AvailableFlights';
import Queries from '@Pages/Queries';

const getAdminLinks = (pathPrefix = '') => {
    return [
        {
            to: pathPrefix+'/available-flights',
            label: 'Vuelos disponibles'
        },
        {
            to: pathPrefix+'/queries',
            label: 'Consultas'
        }
    ]
}

const getEmployeeLinks = (pathPrefix = '') => {
    return [
        {
            to: pathPrefix+'/available-flights',
            label: 'Vuelos disponibles'
        }
    ]
}

class Dashboard extends React.Component{

    constructor(props) {
        super(props);
        let urlParams = QueryString.parse(props.location.search);
        let links = urlParams.isAdmin ? getAdminLinks(props.location.pathname) : getEmployeeLinks(props.location.pathname);
        this.state = { 
            arrivePath: props.location.pathname,
            links: links
        }
    }

    componentWillMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            // This will be executed on route change
            window.scrollTo(0,0);
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render(){
        if(this.props.location.pathname == this.state.arrivePath){
            return <Redirect to={this.state.links[0].to}/>
        }

        return (
            <div id="dashboard-page">
                <Redirect to={this.state.links[1].to}/> {/*TODO Take this out */}
                <SideBar links={this.state.links} className="dashboard-sidebar"/>
                <div className="dashboard-content">
                    <Route path={`${this.state.arrivePath}/available-flights`} component={AvailableFlights}/>
                    <Route path={`${this.state.arrivePath}/queries`} component={Queries}/>
                </div> 
            </div>
        );
    }

}

export default  withRouter(Dashboard);