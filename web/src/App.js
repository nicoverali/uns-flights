import React from 'react';
import {MemoryRouter, Route} from 'react-router-dom';

import Login from '@Pages/Login';
import Dashboard from '@Pages/Dashboard';
import SplashScreen from '@Pages/SplashScreen';

export default class App extends React.Component{

    render(){
        
        return (
            <MemoryRouter initialEntries={['/splash']}>
                <Route path="/splash" component={SplashScreen}/>
                <Route path="/login" component={Login}/>
                <Route path='/dashboard' component={Dashboard}/>
            </MemoryRouter>
        )

    }

}