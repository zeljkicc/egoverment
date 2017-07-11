import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

import AccountsUI from './AccountsUI';

import Login from './Login';
import Logged from './Logged';

import NavDrawer from './NavDrawer';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Header extends TrackerReact(Component) {
constructor(props){
	super(props);

	this.state = {
		navOpen:false
	}
}

  currentUser(){
  	//console.log("Ovde smo " + Meteor.user());
  	if(Meteor.user())
  	return true;
  	else return false;
  }


handleTouchTap(e) {
	e.preventDefault();
	this.setState({
		navOpen: true
	})

  //alert('onTouchTap triggered on the title component');
 // Session.set("drawer-open", true);

 	//this.props.handleDrawerOpen;
}

handleChange(open){
	this.setState
}

navOpen(){
	return this.state.open;
}


	render(){
		let logged = this.currentUser();
		
		let headerStyle = {
			position: "fixed",
			top: 0,
			zIndex: 10,
			width: "100%"			
		}

		return(
			<header style={headerStyle}>
				<nav>
					 <NavDrawer open={this.navOpen} handleChange={this.handleChange.bind(this)} />
					 <AppBar
	    				title="Portal gradjanske inicijative"
	    				iconClassNameRight="muidocs-icon-navigation-expand-more"
	    				iconElementRight={logged ? <Logged /> : <Login />}
	    				onLeftIconButtonTouchTap={this.handleTouchTap.bind(this)}
	  				/>
  				</nav>
				
			</header>
				
			)
	}
}