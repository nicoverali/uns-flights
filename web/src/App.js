import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import Login from '@Pages/Login';
import Dashboard from '@Pages/Dashboard';
import SplashScreen from '@Pages/SplashScreen';

export default class App extends React.Component {

  render() {

    return (
      <div>
        <div className="app-component">
          <MemoryRouter initialEntries={['/splash']}>
            <Route path="/splash" component={SplashScreen} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
          </MemoryRouter>
        </div>
        <ReactNotification />
      </div>
    );

  }

}
