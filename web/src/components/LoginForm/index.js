import './index.scss';
import React from 'react';
import UserIcon from 'Assets/images/account-circle.svg';
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
        this.setState({isAdmin: !this.state.isAdmin, empId: ''});
    }

    handleLogin = event => {
        event.preventDefault();
        this.setState({isLoading: true});
    }


    render(){
        let loginModeText = `Ingresar como ${this.state.isAdmin ? 'empleado' : 'administrador'}`;
        let submitButtonContent = this.isLoading ? (<BeatLoader></BeatLoader>) : 'INGRESAR';

        return (
            <div className="login-form">
                <UserIcon id="user-icon"></UserIcon> 
                <h3>Empleado</h3>
                <form onSubmit={this.handleLogin}>
                    <p className={this.state.isAdmin ? 'hidden' : ''}>
                        <label className="input-caption">N Legajo</label>
                        <input type="text" name="empId" value={this.state.empId} onChange={this.handleEmpIdChange} />
                    </p>
                    <p>
                        <label className="input-caption">Contrasena</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                    </p>

                    <button type="submit">
                        {submitButtonContent}
                    </button>
                </form>

                <a onClick={this.handleLoginModeChange}>{loginModeText}</a>
            </div>
        );
    }    

}