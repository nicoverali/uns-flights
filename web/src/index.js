'use strict';
import './main.scss';
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';

import Login from '@Pages/Login';


const domContainer = document.querySelector('#app');
ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={Login}/>
  </BrowserRouter>
,domContainer);