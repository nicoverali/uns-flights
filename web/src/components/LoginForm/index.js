import './index.scss';
import React from 'react';
import {Redirect} from 'react-router-dom';
import UserIcon from '@Assets/icons/account-circle.svg';

import TextInput from './TextInput';
import PrimaryButton from '@Components/PrimaryButton';
import BeatLoader from 'react-spinners/BeatLoader';

import LoginHandler from './LoginHandler';

export default class LoginForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            isLoading: false,
            isAdmin: false, 
            empId: '', 
            password:''
        };
        
        this.loginHandler = new LoginHandler();
    }

    handleEmpIdChange = event => {
        const BACKSPACE = 8;
        let input = event.target.value;
        // Accept only numbers or delete
        if(!isNaN(input) || event.keyCode===BACKSPACE){
            this.setState({empId: event.target.value});
        }
    }

    handlePasswordChange = event => {
        this.setState({password: event.target.value});
    }

    handleLoginModeChange = event => {
        this.setState({isAdmin: !this.state.isAdmin, empId: '', password: ''});
    }

    handleLogin = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        if(this.state.isAdmin){
            let promise = this.loginHandler.loginAsAdmin(this.state.password);
            promise.then(() => {
                this.setState({isLoggedIn: true})
            })
        }
    }

    getFormButtonContent(isLoading){
        if(isLoading){
            return (<BeatLoader size={8} color={'#FFF'}/>);
        }
        return 'INGRESAR';
    }

    render(){
        let empIdInputClass = this.state.isAdmin ? 'hide' : '';
        let submitButtonContent = this.getFormButtonContent(this.state.isLoading);

        let redirection = '';
        console.log(`/dashboard?idAdmin=${this.state.isAdmin}`);
        if(this.state.isLoggedIn){
            redirection = (<Redirect to={`/dashboard?isAdmin=${this.state.isAdmin}`} />)
        }

        return (
            <div {...this.props} className={`login-form-component ${this.props.className||''}`} >
                {redirection}
                <UserIcon className="user-icon"/> 

                <h3 className="user">{this.state.isAdmin ? 'Administrador' : 'Empleado'}</h3>

                <form onSubmit={this.handleLogin}>
                    <fieldset className="form-input-container">
                        <TextInput className={empIdInputClass} 
                            label="Nº Legajo" 
                            value={this.state.empId} 
                            onChange={this.handleEmpIdChange}/>
                        <TextInput label="Contraseña" 
                            value={this.state.password} 
                            onChange={this.handlePasswordChange} 
                            password/>
                    </fieldset>

                    <PrimaryButton type="submit" className="submit-button">
                        {submitButtonContent}
                    </PrimaryButton>
                </form>

                <a onClick={this.handleLoginModeChange}>
                    {`Ingresar como ${this.state.isAdmin ? 'empleado' : 'administrador'}`}
                </a>
            </div>
        );
    }    

}