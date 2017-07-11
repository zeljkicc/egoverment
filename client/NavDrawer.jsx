import React, {Component} from 'react';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import List from 'material-ui/svg-icons/action/list';
import Add from 'material-ui/svg-icons/content/add';
import Home from 'material-ui/svg-icons/action/home';
import Phone from 'material-ui/svg-icons/communication/phone';
import Android from 'material-ui/svg-icons/action/android';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

import AppBar from 'material-ui/AppBar';

import Login from './Login';
import Logged from './Logged';

import SearchBar from './SearchBar';

export default class NavDrawer extends TrackerReact(Component) {
	constructor(props){
		super(props);


		//Session.set("drawer-open", false);

		this.state = {
			user: this.user(),
			open: false,
			search: false
		}
		
	}

	handleDrawerChange(){
		
	}

	drawerSession(){
		return Session.get("drawer-open");
	}

	user(){
		return Meteor.user();
	}

	handleClose = () => this.setState({open: false});

	currentUser(){
  	//console.log("Ovde smo " + Meteor.user());
  	if(this.user())
  	return true;
  	else return false;
  }

	
	search(){
		return this.state.search;
	}

	searchClick(){
		this.setState({
			search: true
		});
	}

	handleBackClick(){
		this.setState({
			search: false
		});
	}
	
	handleUpdateProfile(event){
		event.preventDefault();
		
		if(Meteor.userId()){
			FlowRouter.go("/updateprofile");
			
			this.setState({
				open: false
			});
		}
		
	}

	render(){		

		let logged = this.currentUser();

		let headerElement = this.search() ? 
		 			<SearchBar handleBackClick={this.handleBackClick.bind(this)}/>
	  				:
	  				<AppBar
	    				title="Portal gradjanske inicijative"
	    				iconClassNameRight="muidocs-icon-navigation-expand-more"
	    				iconElementRight={logged ? <Logged searchClick={this.searchClick.bind(this)}/> : <Login />}
	    				onLeftIconButtonTouchTap={() => this.setState({open: true})}
	  				/>;

		

		let imgStyle={
			width:"80px",
			height:"80px",
			borderRadius:"40px",
			opacity:"1"
		}

		let aStyle={
			textDecoration: "none",
			color:"rgba(0, 0, 0, 0.87)",
			opacity:"1"
		}

		let divStyle = {
			
			color:"white",
			padding:"10px",
			opacity:"0.8",
			backgroundImage:"url(/img/nav-drawer.jpg)",
			backgroundColor: "rgb(0, 188, 212)",
			backgroundSize: "cover"
		}
		
		let user = this.user();
		let userElement = <div style={divStyle}><img style={imgStyle} src="/img/profile.png" >
								</img>
								<h2>Ulogujte se</h2></div>;
		if(user){
			
			userElement = <div style={divStyle}>
								<img style={imgStyle} className="cardHover" src={user.profile.imgSrc} 
								onTouchTap={this.handleUpdateProfile.bind(this)}>								
								</img>
								<h2 style={{marginBottom:"0px"}}>{user.profile.firstname} {user.profile.lastname}</h2>
								<h3 style={{marginTop:"0px"}}>{user.emails[0].address}</h3>
						  </div>;
		}
		
		let headerStyle = {
			position: "fixed",
			top: 0,
			zIndex: 10,
			width: "100%"			
		}


		return(
<header>
	<nav>
		<Drawer
		 open={this.state.open}
		 docked={false}
		 width={300}
		 onRequestChange={(open) => this.setState({open})}
		 >
		 
		 {userElement}
		 
		  <a href="/" style={aStyle}><MenuItem onTouchTap={this.handleClose} leftIcon={<Home />}>Pocetna</MenuItem></a>

		  <Divider />

          <a href="/initiativeslist" style={aStyle}><MenuItem onTouchTap={this.handleClose} leftIcon={<List />}>Lista inicijativa</MenuItem></a>
          <a href="/createinitiative" style={aStyle}><MenuItem onTouchTap={this.handleClose} leftIcon={<Add />}>Kreiraj inicajativu</MenuItem></a>


          <Divider />

          <a href="/about" style={aStyle}><MenuItem onTouchTap={this.handleClose} leftIcon={<Home />}>O nama</MenuItem></a>
          <a href="/contact" style={aStyle}><MenuItem onTouchTap={this.handleClose} leftIcon={<Phone />}>Kontakt</MenuItem></a>

			{
				(!Meteor.isCordova)
					?
						<div>
							<Divider />
							<a href="/android-app" style={aStyle}><MenuItem onTouchTap={this.handleClose} leftIcon={<Android />}>Preuzmite aplikaciju</MenuItem></a>
						
						</div>
					:
						""			  
				  
			}
        </Drawer>

        {headerElement}
       

	</nav>
</header>
        )
		
	}
}

