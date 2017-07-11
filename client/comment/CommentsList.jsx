import React, {Component} from 'react';

import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {List, ListItem} from 'material-ui/List';

import RaisedButton from 'material-ui/RaisedButton';

import CommentSingle from './CommentSingle';

import MDSpinner from "react-md-spinner";

import CommentsFilter from './CommentsFilter';

export default class CommentsList extends  TrackerReact(Component) {
	constructor(props){
		super(props);
		
		let initiativeId = props.initiativeId;
		this.state = {
			sort: "first",
            skip: 0,
            limit: 10
		}
		
		
	}
	

	/*componentWillUnmount(){
		this.state.subscription.comments.stop();
	} */
	
	switchSort(){
		let sort = null;
		
		switch(this.state.sort){
			case "first":
				sort = {sort: {date: -1}};
			break;
			case "last":
				sort = {sort: {date: 1}};
			break;
			case "highestLikes":
				sort = {sort: {likes: -1}};
			break;
			case "lowestLikes":
				sort = {sort: {likes: 1}};
			break;
			case "highestDislikes":
				sort = {sort: {dislikes: -1}};
			break;
			case "lowestDislikes":
				sort = {sort: {dislikes: 1}};
			break;
			default:
				sort = {sort: {date: -1}};
			}
			
			sort.skip = this.state.skip;
			sort.limit = this.state.limit;
		
		return sort;
	}

	comments(){
		let sort = this.switchSort();     
		return Comments.find({initiative: this.props.initiativeId}, sort).fetch();
	}

	handleSortChange(value){
		this.setState({
			sort: value
		});

		console.log(value);
	}
    
    showMore(){
        this.setState({
            limit: this.state.limit + 10
        })
    }



render(){
	
	let sort = this.switchSort();
	Meteor.subscribe("commentsIni", {
					initiative: this.props.initiativeId,
					sort: sort
				});
	
	console.log(this.comments());
	let items = this.comments().map((item, i) => {
		return <CommentSingle key={item._id} _id={item._id} text={item.text}
		 user={item.user} i={i} date={item.date} user={Meteor.users.findOne({"_id":item.user})}/>
	});

		if(!items){
			return(<div><MDSpinner /></div>);
		}
	
	return(
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
					<CommentsFilter handleSortChange={this.handleSortChange.bind(this)}/>
		      		{items}
                    
		      	</ReactCSSTransitionGroup>
                <RaisedButton label="Prikaži više" onTouchTap={this.showMore.bind(this)}/>
            
    	</ReactCSSTransitionGroup>

		) 
	}
}