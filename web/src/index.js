'use strict';
import './main.scss';
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter, Route} from 'react-router-dom';

import Login from '@Pages/Login';
import Dashboard from '@Pages/Dashboard';


const domContainer = document.querySelector('#app');
ReactDOM.render(
  <MemoryRouter initialEntries={['/dashboard?isAdmin=true']}>
    <Route path="/login" component={Login}/>
    <Route path='/dashboard' component={Dashboard}/>
  </MemoryRouter>
,domContainer);