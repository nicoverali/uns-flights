'use strict';
import './main.scss';
import 'normalize.css';
import LoginForm from 'Components/LoginForm';
import React from 'react';
import ReactDOM from 'react-dom';


const domContainer = document.querySelector('#app');
ReactDOM.render(
  <div>
    <LoginForm>

    </LoginForm>
  </div>  
,domContainer);