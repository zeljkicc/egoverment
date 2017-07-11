import React, {Component} from 'react';

import {ListItem} from 'material-ui/List';

import {darkBlack} from 'material-ui/styles/colors';

import Divider from 'material-ui/Divider';

import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card';

import FlatButton from 'material-ui/FlatButton';

export default class SignerSingle extends Component {
constructor(props){
	super(props);

}

render(){

	let itemStyle={
		marginTop:"5px",
		marginBottom:"5px"
	}

	let name = "";
	let city = "";
	let time = "";

	if(this.props.signer){
		name = (this.props.user) ? this.props.user.profile.firstname + " " + this.props.user.profile.lastname : "Nepoznat";
		city = (this.props.user) ? this.props.user.profile.place : "Nepoznato";
		time = moment(this.props.signer.date).locale("sr").format('LLLL');
		if(this.props.signer.displayName !== undefined){
			name = (this.props.signer.displayName) ? name : "Anoniman";
		}
		
	}


	return(
		<div className="cardHover" style={itemStyle}>			

			<Card >
			    <CardText >
			      <h3 style={{color: "rgb(0, 188, 212)"}}>{this.props.i + ". " + name}</h3>
			      <h4 style={{color: darkBlack}}>{city + " - " + time}</h4>
			    </CardText>
			  </Card>

		</div>
		)
	}
}