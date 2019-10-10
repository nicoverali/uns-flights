import React from 'react';
import {MemoryRouter, Route} from 'react-router-dom';

import Login from '@Pages/Login';
import Dashboard from '@Pages/Dashboard';
import SplashScreen from '@Pages/SplashScreen';

import { Hook, Console, Decode } from 'console-feed'

export default class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            logs: [],
            isDevelop: process.env.NODE_ENV == 'development'
        }
    }


    componentDidMount() {
        if(this.state.isDevelop){
            Hook(window.console, log => {
              this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }))
            })
        
            console.log(`Hello world!`)
        }
      }

    render(){
        
        return (
            <div id="app-component">
                <div className={`app-content ${this.state.isDevelop && 'debug'}`}>
                    <MemoryRouter initialEntries={['/splash']}>
                        <Route path="/splash" component={SplashScreen}/>
                        <Route path="/login" component={Login}/>
                        <Route path='/dashboard' component={Dashboard}/>
                    </MemoryRouter>
                </div>
                {this.state.isDevelop &&
                    <div className="app-console">
                        <Console logs={this.state.logs} variant="dark" />
                    </div>
                }
            </div>
        )

    }

}