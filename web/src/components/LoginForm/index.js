import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { store } from 'react-notifications-component';

import UserIcon from '@Assets/icons/account-circle.svg';
import PrimaryButton from '@Components/PrimaryButton';
import BeatLoader from 'react-spinners/BeatLoader';
import TextInput from './TextInput';

import { loginAsAdmin, loginAsEmployee } from './LoginHandler';

export default class LoginForm extends React.Component {

	constructor(props) {

		super(props);
		this.state = {
			isLoggedIn: false,
			isLoading: false,
			isAdmin: false,
			empId: '',
			password: '',
		};

	}

	static getFormButtonContent(isLoading) {

		if (isLoading) {

			return <BeatLoader size={8} color="#FFF" />;

		}
		return 'INGRESAR';

	}

	handleEmpIdChange = (event) => {

		const BACKSPACE = 8;
		const input = event.target.value;
		// Accept only numbers or delete
		// eslint-disable-next-line no-restricted-globals
		if (!isNaN(input) || event.keyCode === BACKSPACE) {

			this.setState({ empId: event.target.value });

		}

	};

	handlePasswordChange = (event) => {

		this.setState({ password: event.target.value });

	};

	handleLoginModeChange = () => {

		this.setState((prevState) => ({ isAdmin: !prevState.isAdmin, empId: '', password: '' }));

	};

	handleLogin = (event) => {

		event.preventDefault();
		this.setState({ isLoading: true });
		const loginPromise = this.state.isAdmin
			? loginAsAdmin(this.state.password)
			: loginAsEmployee(this.state.empId, this.state.password);

		loginPromise
			.then(() => {

				this.setState({ isLoggedIn: true });

			})
			.catch(() => {

				store.addNotification({
					title: 'Error',
					message: 'Verificar los datos ingresados.',
					type: 'danger',
					insert: 'bottom',
					container: 'bottom-right',
					animationIn: ['animated', 'fadeIn'],
					animationOut: ['animated', 'fadeOut'],
					dismiss: {
						duration: 5000,
						onScreen: true,
					},
				});
				this.setState({ isLoading: false });

			});

	};

	render() {

		const empIdInputClass = this.state.isAdmin ? 'hide' : '';
		const submitButtonContent = this.getFormButtonContent(this.state.isLoading);

		let redirection = '';
		if (this.state.isLoggedIn) {

			redirection = <Redirect to={`/dashboard?isAdmin=${this.state.isAdmin}`} />;

		}

		return (
			<div className={`login-form-component ${this.props.className}`}>
				{redirection}
				<UserIcon className="user-icon" />

				<h3 className="user">{this.state.isAdmin ? 'Administrador' : 'Empleado'}</h3>

				<form onSubmit={this.handleLogin}>
					<fieldset className="form-input-container">
						<TextInput
							className={empIdInputClass}
							label="Nº Legajo"
							value={this.state.empId}
							onChange={this.handleEmpIdChange}
						/>
						<TextInput
							label="Contraseña"
							value={this.state.password}
							onChange={this.handlePasswordChange}
							isPassword
						/>
					</fieldset>

					<PrimaryButton type="submit" className="submit-button">
						{submitButtonContent}
					</PrimaryButton>
				</form>

				<button
					type="button"
					onClick={this.handleLoginModeChange}
					onKeyPress={this.handleLoginModeChange}
				>
					{`Ingresar como ${this.state.isAdmin ? 'empleado' : 'administrador'}`}
				</button>
			</div>
		);

	}

}

LoginForm.defaultProps = { className: '' };

LoginForm.propTypes = { className: PropTypes.string };
