import './index.scss';
import React from 'react';
import {Redirect} from 'react-router-dom';
import BrandLogo from '@Components/BrandLogo';
import BounceLoader from 'react-spinners/BounceLoader';

export default class SplashScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading : true
        }

        setTimeout(()=>{
            if(window.javaSQLBridge != null){
                this.setState({loading: false});
            }
        }, 200);
    }

    render(){
        let redirect = this.state.loading ? '' : (<Redirect to='/login' />);


        return (
            <div id="splash-screen-page">
                {redirect}
                <div className="splash-content-wrapper">
                    <BrandLogo className="splash-screen-logo" size="big"/>
                    <div className="splash-load-spinner-wrapper">
                        <BounceLoader
                            sizeUnit={"px"}
                            size={150}
                            color={'#123abc'}
                        />
                    </div>
                </div>
            </div>
        )
    }

}