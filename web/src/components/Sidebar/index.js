import './index.scss';
import React from 'react';
import BrandLogo from '@Components/BrandLogo';
import SidebarItem from './SidebarItem';

export default class SideBar extends React.Component{

    constructor(props){
        super(props);
        let initialActiveLink = props.links ? props.links[0].label : '';
        this.state = {
            activeItem: initialActiveLink
        }
    }

    handleItemSelected = (itemName) => {
        this.setState({activeItem: itemName});
    }

    render(){
        let items = [];
        if(this.props.links != null){

            for(let i = 0; i < this.props.links.length; i++){
                let link = this.props.links[i];

                items.push(
                    <SidebarItem 
                        key={link.label}
                        linkTo={link.to} 
                        label={link.label} 
                        onClick={()=>this.handleItemSelected(link.label)}
                        active={this.state.activeItem == link.label}
                    />
                )
            }
        }

        return (
            <div {...this.props} className={`sidebar-component ${this.props.className || ''}`}>
                <BrandLogo className="sidebar-logo"/>
                <div className="side-bar-items">
                    {items}
                </div>
            </div>
        )

    }

}