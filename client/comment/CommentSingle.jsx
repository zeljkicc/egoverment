import React, {Component} from 'react';

import {ListItem} from 'material-ui/List';

import {darkBlack} from 'material-ui/styles/colors';

import Divider from 'material-ui/Divider';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card';

import IconButton from 'material-ui/IconButton';

import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';

import {blue500, red500, greenA200} from 'material-ui/styles/colors';

export default class CommentSingle extends TrackerReact(Component) {
constructor(props){
	super(props);

}

	/*componentWillUnmount(){
		this.state.subscription.commentLikes.stop();
	}*/

handleTouchTapLike(event){
	event.preventDefault();

	Meteor.call("updateOrInsertLike", Meteor.userId(), this.props._id, true);
}

handleTouchTapDislike(event){
	event.preventDefault();

	Meteor.call("updateOrInsertLike", Meteor.userId(), this.props._id, false);

}

commentLike(){
	return CommentLikes.findOne({"$and": [{"comment": this.props._id}, {"user": Meteor.userId()}]});
}

commentLikes(){
	return CommentLikes.find({"$and": [{"comment": this.props._id}, {"value": true}]}).count();
}

commentDislikes(){
	return CommentLikes.find({"$and": [{"comment": this.props._id}, {"value": false}]}).count();
}


render(){
	
	Meteor.subscribe("commentLikes", 
				{
					"comment": this.props._id
				});

	let itemStyle={
		marginTop:"5px",
		marginBottom:"5px"
	}

	let name = (this.props.user) ? this.props.user.profile.firstname + " " + this.props.user.profile.lastname : "Nepoznat";
	let time = moment(this.props.date).locale("sr").format('LLLL');

	let commentLikes = this.commentLikes();
	let commentDislikes = this.commentDislikes();

	let likeButtons;
	let commentLike = this.commentLike();
	if(commentLike){
		console.log(commentLike);
		if(commentLike.value){
			likeButtons = 	<div>
							<IconButton 
					    		tooltip="Obelezili ste komentar da vam se svidja"
					    		onTouchTap={this.handleTouchTapLike.bind(this)}
					    		
					    		>
						      <ThumbUp color={greenA200}/>
						    </IconButton><span style={{color:"green"}}>({commentLikes})</span>
						    <IconButton 
						    	tooltip="Ne svidja mi se"
						    	onTouchTap={this.handleTouchTapDislike.bind(this)}
						    	>
						      <ThumbDown />
						    </IconButton>({commentDislikes})
					    </div>;
		}
		else{
			likeButtons = 	<div>
							<IconButton 
					    		tooltip="Svidja mi se"
					    		onTouchTap={this.handleTouchTapLike.bind(this)}
					    		>
						      <ThumbUp />
						    </IconButton>({commentLikes})
						    <IconButton 
						    	tooltip="Obelezili ste komentar da vam se ne svidja"
						    	onTouchTap={this.handleTouchTapDislike.bind(this)}
						    	
						    	>
						      <ThumbDown color={red500}/>
						    </IconButton><span style={{color:"red"}}>({commentDislikes})</span>
					    </div>;
		}
	}
	else{
		likeButtons = 	<div>
							<IconButton 
					    		tooltip="Svidja mi se"
					    		onTouchTap={this.handleTouchTapLike.bind(this)}
					    		>
						      <ThumbUp />
						    </IconButton>({commentLikes})
						    <IconButton 
						    	tooltip="Ne svidja mi se"
						    	onTouchTap={this.handleTouchTapDislike.bind(this)}
						    	>
						      <ThumbDown />
						    </IconButton>({commentDislikes})
					    </div>;
	}

	return(
		<div className="cardHover" style={itemStyle}>			

			<Card >

			    <CardText >
			      <h4 style={{color: darkBlack}}>{name + ", " + time}</h4>
			      <p>{this.props.text}</p>
			    </CardText>
			    <CardActions>
			    	{likeButtons}
			    </CardActions>
			  </Card>

		</div>
		)
	}
}