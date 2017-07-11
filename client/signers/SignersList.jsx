import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {List, ListItem} from 'material-ui/List';



import SignerSingle from './SignerSingle';

import MDSpinner from "react-md-spinner";

import SignersFilter from './SignersFilter';

export default class SignersList extends TrackerReact(Component) {
  constructor(props){
		super(props);

		this.state = {
			sort: "first",
			limit: 10
		}
	}

	signers(){
		let sort = null;
		//console.log("REcimo ovde smo: " + this.state.sort);
		switch(this.state.sort){
			case "first":
				sort = {sort: {date: -1}};
			break;
			case "last":
				sort = {sort: {date: 1}};
			break;
			case "atozName":
				
			break;
			case "ztoaName":

			break;
			case "atozCity":

			break;
			case "ztoaCity":

			break;
			default:
				sort = {sort: {date: -1}};
			}

		return Signers.find({initiative: this.props.initiativeId}, sort).fetch();
	}

	handleSortChange(value){
		this.setState({
			sort: value
		});

		console.log(value);
	}
	
	showMore(){
		this.setState({
			limit: this.limit + 10
		});
	}


  
  render() {
	  
	 Meteor.subscribe("limitSigners", {
		initiative: this.props.initiativeId,
		limit: this.state.limit
	 });

  	console.log(this.signers());
	let items = this.signers().map((item, i) => {
		return <SignerSingle key={item._id} i={i} signer={item} user={Meteor.users.findOne({"_id":item.user})} 
				/>
	});

		if(!items){
			return(<div><MDSpinner /></div>);
		}

    return (
      <ReactCSSTransitionGroup
					component="div"
					transitionName="route"
					transitionEnterTimeout={600}
					transitionAppearTimeout={600}
					transitionLeaveTimeout={400}
					transitionAppear={true}
					>
				
				<ReactCSSTransitionGroup
					transitionName="item"
					transitionEnterTimeout={600}
					transitionLeaveTimeout={400}
					>

		      		{items}
		      	</ReactCSSTransitionGroup>
				<RaisedButton label="Prikaži više" onTouchTap={this.showMore.bind(this)}/>

    	</ReactCSSTransitionGroup>
    );
  }
}

/*
<SignersFilter handleSortChange={this.handleSortChange.bind(this)} /> */