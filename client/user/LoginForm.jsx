import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Accounts } from 'meteor/accounts-base';

export default class LoginForm extends Component {

constructor(){
	super();

	this.state={
		email:"",
		password:""
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
	Meteor.loginWithPassword(this.state.email, this.state.password, 
		function(error){
        	if(error){
        		Bert.alert('Greska prilikom logovanja. Pokusajte ponovo.',
					'danger', 'fixed-top', 'fa-frown-o');
        	}
        	else{
        		Bert.alert('Uspesno logovanje!',
					'success', 'fixed-top', 'fa-check');

        		FlowRouter.go('/');
        	}
        });

	
}

render(){
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
					
						    <RaisedButton
						      style={{marginTop:"20px"}}
						      label="Logovanje"
						      primary={true}
						      onTouchTap={this.handleRequestCreate.bind(this)}
						      fullWidth={true}
						    />
						</form>	
						<div style={{textAlign:"center"}}>
						<h4><i><a href="/register" style={{textDecoration: "none", color:"rgba(0, 0, 0, 0.87)"}}>
								Nemate nalog? Kreirajte ga ovde.</a></i></h4>	
						</div>
					</div>	
				</div>
				<div className="col-md-4">
				</div>
			</div>	
			
			
		</ReactCSSTransitionGroup>
		)
	}
}