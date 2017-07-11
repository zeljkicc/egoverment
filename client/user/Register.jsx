import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { Accounts } from 'meteor/accounts-base';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Register extends Component {

constructor(){
	super();

	this.state={
		email:"",
		password:"",
		firstname:"",
		lastname:"",
		place:"",
		imgSrc:"/img/profile.png"
	}


}

handleChange(event) {
	//console.log(event.target.value);
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


handleRequestCreate(event){
	event.preventDefault();
	console.log(this.state);

	//let initiative = this.state;
	//initiative.date = new Date();
	//initiative.user = "hfdgfd48d4fg5dfg5d";

	//Initiatives.insert(initiative);
	Meteor.call("registerUser", this.state, function(error){
		if(error){
        		Bert.alert('Greska prilikom registrovanja. Pokusajte ponovo.',
					'danger', 'fixed-top', 'fa-frown-o');
        	}
        	else{
        		Bert.alert('Uspesno ste se registrovali!',
					'success', 'fixed-top', 'fa-check');
				
				
        		FlowRouter.go('/login');
        	}		
	});
	
}


startCamera(){
	_this = this;
	MeteorCamera.getPicture(
	{
		//quality:50
	}, 
	function(error, data){
		if(!error){
			_this.setState({
				imgSrc: data
			})
		}
	})
}

render(){

	let imgStyle={
		width:"200px",
		height:"200px",
		borderRadius:"100px",
		margin:"auto"
	}
	return(
		<ReactCSSTransitionGroup
					transitionName="route"
					transitionEnterTimeout={600}
					transitionAppearTimeout={600}
					transitionLeaveTimeout={400}
					transitionAppear={true}
					>
			<div className="row">
				<div className="col-md-4">
				</div>
				<div className="col-md-4">
					<div className="formCreate">
						<form>
							<div style={{textAlign:"center"}}>
								<img style={imgStyle} src={this.state.imgSrc} onTouchTap={this.startCamera.bind(this)}>
									
								</img>
							</div>
							<TextField
							  onChange={this.handleChange.bind(this)}
							  name="email"
							  type="email"
							  value={this.state.email}
						      hintText="Upisite email"
						      floatingLabelText="Email"
						      fullWidth={true}
						    />

						    <TextField
						      onChange={this.handleChange.bind(this)}
						      name="password"
						      type="password"
						      value={this.state.password}
						      hintText="Upisite password"
						      floatingLabelText="Password"
						      fullWidth={true}
						    />

						    <TextField
							  onChange={this.handleChange.bind(this)}
							  name="firstname"
							  type="text"
							  value={this.state.firstname}
						      hintText="Upisite ime"
						      floatingLabelText="Ime"
						      fullWidth={true}
						    />

						    <TextField
							  onChange={this.handleChange.bind(this)}
							  name="lastname"
							  type="text"
							  value={this.state.lastname}
						      hintText="Upisite rezime"
						      floatingLabelText="Prezime"
						      fullWidth={true}
						    />

						    <TextField
							  onChange={this.handleChange.bind(this)}
							  name="place"
							  type="text"
							  value={this.state.place}
						      hintText="Upisite grad ili mesto"
						      floatingLabelText="Grad ili mesto"
						      fullWidth={true}
						    />
					
						    <RaisedButton
						      style={{marginTop:"20px"}}
						      label="Kreirati nalog"
						      primary={true}
						      onTouchTap={this.handleRequestCreate.bind(this)}
						      fullWidth={true}

						    />
						</form>					
					</div>
				</div>
				<div className="col-md-4">
				</div>
			</div>
		</ReactCSSTransitionGroup>		
		)
	}
}