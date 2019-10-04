import './index.scss';
import React from 'react';
import UserIcon from 'Assets/icons/account-circle.svg';
import BeatLoader from 'react-spinners/BeatLoader';
import PrimaryButton from 'Components/PrimaryButton';

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


    render(){
        let userName = this.state.isAdmin ? 'Administrador' : 'Empleado';
        let loginModeText = `Ingresar como ${this.state.isAdmin ? 'empleado' : 'administrador'}`;
        let submitButtonContent = this.state.isLoading ? (<BeatLoader size={8} color={'#FFF'}/>) : 'INGRESAR';

        return (
            <div id="login-form" {...this.props}>
                <UserIcon className="user-icon"/> 

                <h3 className="user">{userName}</h3>

                <form onSubmit={this.handleLogin}>
                    <fieldset className="form-input-container">
                        <div className={this.state.isAdmin ? 'input-container hide' : 'input-container'}>
                            <label>Nº Legajo</label>
                            <input type="text" name="empId" value={this.state.empId} onChange={this.handleEmpIdChange} />
                        </div>
                        <div className="input-container">
                            <label>Contraseña</label>
                            <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                        </div>
                    </fieldset>

                    <PrimaryButton type="submit" className="submit-button">
                        {submitButtonContent}
                    </PrimaryButton>
                </form>

                <a onClick={this.handleLoginModeChange}>{loginModeText}</a>
            </div>
        );
    }    

}