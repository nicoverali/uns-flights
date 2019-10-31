import './index.scss';
import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import SideBar from '@Components/Sidebar';

import AvailableFlights from '@Pages/AvailableFlights';
import Queries from '@Pages/Queries';
import DatabaseTables from '@Pages/DatabaseTables';

const getAdminLinks = (pathPrefix = '') => [
	{
		to: `${pathPrefix}/queries`,
		label: 'Consultas',
	},
	{
		to: `${pathPrefix}/database-tables`,
		label: 'Tablas',
	},
];

const getEmployeeLinks = (pathPrefix = '', empId) => [
	{
		to: {
			pathname: `${pathPrefix}/available-flights`,
			state: {
				empId,
			}
		},
		label: 'Vuelos disponibles',
	},
];

class Dashboard extends React.Component {

	constructor(props) {

		super(props);
		const { pathname, state } = props.location;
		const links = state.isAdmin	? getAdminLinks(pathname) : getEmployeeLinks(pathname, state.empId);
		this.state = { arrivePath: pathname, links };

	}

	componentDidMount() {

		this.unlisten = this.props.history.listen(() => {

			// This will be executed on route change
			window.scrollTo(0, 0);

		});

	}

	componentWillUnmount() {

		this.unlisten();

	}

	render() {

		const { location } = this.props; 
		const { links, arrivePath } = this.state

		if (location.pathname === arrivePath) {

			return <Redirect to={links[0].to} />;

		}

		return (
			<div id="dashboard-page">
				<SideBar links={links} className="dashboard-sidebar" />
				<div className="dashboard-content">
					<Route path={`${arrivePath}/available-flights`} component={AvailableFlights} />
					<Route path={`${arrivePath}/queries`} component={Queries} />
					<Route path={`${arrivePath}/database-tables`} component={DatabaseTables} />
				</div>
			</div>
		);

	}

}

export default withRouter(Dashboard);
