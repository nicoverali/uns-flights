import './index.scss';
import React from 'react';
import UserIcon from '@Assets/icons/account-circle.svg';

import TextInput from './TextInput';
import PrimaryButton from '@Components/PrimaryButton';
import BeatLoader from 'react-spinners/BeatLoader';

export default class LoginForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isAdmin: false, 
            empId: '', 
            password:''
        };
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

        return (
            <div {...this.props} className={`login-form-component ${this.props.className||''}`} >
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