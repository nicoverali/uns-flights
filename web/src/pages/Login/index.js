import './index.scss';
import React from 'react';
import BrandLogo from '@Components/BrandLogo';
import LoginForm from '@Components/LoginForm';
import AirplaneIcon from '@Assets/icons/airplane.svg';

const Login = () => (
	<div id="login-page">
		<BrandLogo className="logo" horizontal />
		<div className="content">
			<LoginForm className="login-form" />
			<p className="app-version">V 1.0.2</p>
		</div>
		<div className="circle-decoration">
			<AirplaneIcon />
		</div>
	</div>
);

export default Login;
