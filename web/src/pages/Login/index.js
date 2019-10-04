import './index.scss';
import React from 'react';
import LoginForm from 'Components/LoginForm';

export default class Login extends React.Component {

    render(){

        return (
            <div id="login-page">
                <LoginForm className="login-form">
                </LoginForm>
            </div>
        );

    }

}