import React, {Component} from 'react';

import {ListItem} from 'material-ui/List';

import {darkBlack} from 'material-ui/styles/colors';

import Divider from 'material-ui/Divider';

import FlatButton from 'material-ui/FlatButton';

import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card';

export default class InitiativeSingle extends Component {
constructor(props){
	super(props);


}

handleTouchTap(event){
	event.preventDefault();

	FlowRouter.go("/initiativeslist/" + this.props._id);
}


render(){
	let itemStyle={
		marginTop:"10px",
		marginBottom:"10px"
	}

	let name = (this.props.user) ? this.props.user.profile.firstname + " " + this.props.user.profile.lastname : "Nepoznat";
	let time = moment(this.props.date).locale("sr").format('LLLL');

	return(
	      <div style={itemStyle} className="cardHover">			

			<Card >

			    <CardTitle 
				    title={<span style={{color: "rgb(0, 188, 212)"}}>{this.props.i+1 + ". " + this.props.name}</span>} 
				    subtitle={<span style={{fontStyle:"italic"}}>
				    	{name}, 
				    	{" " + time}</span>}
				    actAsExpander={true}
      				showExpandableButton={true}
			    />
			    <CardText expandable={true} style={{textAlign:"justify"}}>
			      {this.props.description}
			    </CardText>
			    <CardActions>
			      <FlatButton label="Detalji" onTouchTap={this.handleTouchTap.bind(this)}/>
			    </CardActions>
			  </Card>

		</div>
		)
	}
}

