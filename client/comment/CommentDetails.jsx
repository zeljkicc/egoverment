import React, {Component} from 'react';

import {ListItem} from 'material-ui/List';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

import MDSpinner from "react-md-spinner";

import Divider from 'material-ui/Divider';

import {Container, Row, Col} from 'react-grid-system';

export default class CommentDetails extends TrackerReact(Component) {
constructor(props){
		super(props);

		this.state = {
			subscription: {
				initiatives: Initiatives.find().fetch()
			}
		}
	}

componentWillUnmount(){
		//this.state.subscription.initiatives.stop();
	}

	initiative(){
		console.log(this.props._id);
		return Initiatives.findOne(this.props.id);
	}



render(){
	let initiative = this.initiative();

	let spinnerWrapperStyle = {
		textAlign:"center",
		marginTop:"50px"
	}

	let styleWrapper = {
			margin:"5%"
		}

	let nameStyle = {
		color: "rgb(0, 188, 212)"
	}

	let descriptionStyle = {
		fontStyle: "italic"
	}

	let textStyle = {
		textAlign: "justify"
	}


		if(!initiative){
			return(
				<div style={spinnerWrapperStyle}>
					<MDSpinner 
						size={50}
						
					/>
				</div>
				)
		}

	return(



		<div style={styleWrapper}>
	      <h1 style={nameStyle}>{initiative.name}</h1>

	      <Divider />

	      <h3 style={descriptionStyle}>{initiative.description}</h3>

	      <div className="container">
		      <Row>
			      <Col md={6}>
			      	<h4 style={textStyle}>{initiative.text}</h4>
			      </Col>
			      <Col md={6}>

			      </Col>
		      </Row>
	      </div>

	    </div>
		) 
	}
}