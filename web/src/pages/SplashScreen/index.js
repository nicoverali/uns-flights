import './index.scss';
import vars from '@Root/vars.scss';
import React from 'react';
import {Redirect} from 'react-router-dom';
import BrandLogo from '@Components/BrandLogo';
import ClipLoader from 'react-spinners/ClipLoader';

export default class SplashScreen extends React.Component{

    constructor(props){
        super(props);

        if(window.navigator.userAgent == 'JAVAFX'){
            this.state = {
                loading: true
            }
            this.waitForJavaBridges();
        }
        else{
            this.state = {
                loading: false
            }
        }

    }
    
    waitForJavaBridges(){
        setTimeout(()=>{
            if(window.javaSQLBridge != null){
                this.setState({loading: false});
            }
            else{
                this.waitForJavaBridges();
            }
        }, 200);
    }

    render(){
        let redirect = this.state.loading ? '' : (<Redirect to='/dashboard?isAdmin=true' />);

        return (
            <div id="splash-screen-page">
                {redirect}
                <div className="splash-content-wrapper">
                    <BrandLogo className="splash-screen-logo" size="big"/>
                    <div className="splash-load-spinner-wrapper">
                        <ClipLoader
                            sizeUnit={"px"}
                            size={48}
                            color={vars.secondaryColor}
                        />
                    </div>
                </div>
            </div>
        )
    }

}