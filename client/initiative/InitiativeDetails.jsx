import React, {Component} from 'react';

import {ListItem} from 'material-ui/List';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

import MDSpinner from "react-md-spinner";

import Divider from 'material-ui/Divider';

import FlatButton from 'material-ui/FlatButton';

import RaisedButton from 'material-ui/RaisedButton';

import ReactCountdownClock from 'react-countdown-clock';

import InitiativeDetailsTabs from './InitiativeDetailsTabs';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';

import SetButton from './SetButton';

import LinearProgress from 'material-ui/LinearProgress';

import Dialog from 'material-ui/Dialog';

import Toggle from 'material-ui/Toggle';


//import QuillEditor from './QuillEditor';


export default class InitiativeDetails extends TrackerReact(Component) {
constructor(props){
		super(props);
		if(!this.props.word){
			this.state = {
				subscription: {
					initiatives: Meteor.subscribe("oneInitiative", this.props.id),
					 
				},
				supported:false,
				open: false,
				displayName: false
			}
		}
		else{
			this.state = {
				subscription: {
					initiatives: Meteor.subscribe("textInitiatives", this.props.word)
				},
				supported:false,
				open: false,
				displayName: false
			}			
		}
		
	}

componentWillUnmount(){
		this.state.subscription.initiatives.stop();
	}

	initiative(){
		console.log(this.props._id);
		return Initiatives.findOne();
	}

	handleTouchTapSupport(event){
		event.preventDefault();


		let newSupported = !this.state.supported;
		this.setState({
			supported: !this.state.supported
		});

		if(newSupported)
		{
			Meteor.call('addSigner', {
					initiative: this.initiative()._id,
					user: Meteor.userId(),
					date: new Date(),
					displayName: this.state.displayName
				});
			
			
		}				
		else
		{
			Meteor.call('removeSigner', this.initiative()._id, Meteor.userId());
			this.setState({
				displayName: false
			});
		}	


	}

	user(){
		return Meteor.users.findOne({_id: this.initiative().user});
	}

			supported(){
			if(Signers.findOne({ "$and": [ { "initiative":  this.initiative()._id }, { "user":  Meteor.userId() } ] })) {
				return true;
			}
			else{
				return false;
			}
		}

	handleTouchTapFinish(){
		Meteor.call('finishInitiative', this.initiative()._id);
	}

	userCreated(){
		if(Meteor.userId() === this.initiative().user){
			return true;
		}
		else{
			return false;
		}
	}



	  handleYes = () => {
    this.setState({open: false});
  };

    handleNo = () => {
    this.setState({open: false});
  };

   handleOpen = () => {
    this.setState({open: true});
  };

   displayName(){
       this.setState({
           displayName: !this.state.displayName
       })
   }
   
    picture(){
	   return Pictures.findOne();
	}
	
	text(){
	   return Text.findOne();
	}

render(){
	
	

	let spinnerWrapperStyle = {
		textAlign:"center",
		marginTop:"50px"
	}

	if(!this.initiative()){
		return(
				<div style={spinnerWrapperStyle}>
					<MDSpinner 
						size={50}
						
					/>
				</div>
				);
	}
	

	let supported = this.supported();
	let initiative = this.initiative();

	Meteor.subscribe("pictureById", initiative.pictureId);
	
	Meteor.subscribe("textById", initiative.textId);

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

	let qlStyle = {
			paddingLeft:"0px",
			paddingRight:"0px",
			textAlign: "justify"
	}

	let cardStyle = {
		marginBottom: "20px"
	}

		//izracunavanje vremena od trenutnog do kraja inicijative
		var value24DateSeconds = initiative.value24.getHours() * 60 * 60 
							   + initiative.value24.getMinutes() * 60
							   + initiative.value24.getSeconds();

		var endDateSeconds = initiative.endDate.getTime() / 1000;

		var endSeconds = value24DateSeconds + endDateSeconds;

	 	var nowSeconds = new Date().getTime() / 1000;

	 	var seconds = Math.abs(endSeconds - nowSeconds);
		console.log("proba: +-------------");
		console.log(seconds);
		
		var startSeconds = initiative.date.getTime() / 1000;




		let supportButton = supported ? 
							<FlatButton 
							label="Povuci podršku"
							onTouchTap={this.handleTouchTapSupport.bind(this)}
							secondary={true}
							/> : 
							<FlatButton 
							label="Podrzi inicijativu" 
							onTouchTap={this.handleTouchTapSupport.bind(this)}
							primary={true}
							/>;

		let finishButton = ((this.initiative().finished === false) && this.userCreated()) ? 
							<FlatButton 
							label="Zavrsi peticiju" 
							onTouchTap={this.handleTouchTapFinish.bind(this)}
							secondary={true}
							/> : "";


	 	let user = this.user() ? this.user().profile.firstname + " " + this.user().profile.lastname : "Nepoznat";

	 	let avatar = this.user() ? this.user().profile.imgSrc : "https://cdn3.iconfinder.com/data/icons/black-easy/256/538644-user_256x256.png";

		if(!this.initiative().showData){
			user = "Anoniman";
			avatar = "https://cdn3.iconfinder.com/data/icons/black-easy/256/538644-user_256x256.png";
		}
		
	 	let placeDate = (this.user() ? this.user().profile.place + ", " : "") +
	 	(this.initiative() ? moment(this.initiative().date).locale("sr").format('LLLL') : "");
	 	/////date ne prikazuje!!!!!!!!!!!!!!
		 const actions = [
      <FlatButton
        label="DA"
        primary={true}
        onTouchTap={this.handleYes}
      />,
      <FlatButton
        label="NE"
        primary={true}
        disabled={true}
        onTouchTap={this.handleNo}
      />,
    ];
	
	console.log(Math.floor((nowSeconds - startSeconds) / 3600));
	console.log(Math.floor((endSeconds - startSeconds) / 3600));

	return(

		<div className="row" style={{marginTop:"10px"}}>
			<div className="col-md-2">
			</div>

			<div className="col-md-8">




						  <Card style={cardStyle}>
						    <CardHeader
						      title={user}
						      subtitle={placeDate}
						      avatar={avatar}
						    />
						    <CardMedia
						      overlay={<CardTitle title={initiative.name}/>}
						    >
						      <img src={this.picture() ? this.picture().data : "/img/initiative-default.jpg"} />
						    </CardMedia>

						    <CardText>
						    	{initiative.description}
						    </CardText>
						    <CardActions>
						      {supportButton}
                              {finishButton}
								  {
								   (supported)
								   ?
									  ""
								   :
									  <Toggle
										 label="Prikazi moje ime"
										 style={{marginBottom:"16px", width:"200px"}}
										 labelPosition="right"
										 onToggle={this.displayName.bind(this)}
										 toggle={this.state.displayName}
									   />      
								  }
                                						      
						      
						    </CardActions>
						  </Card>



				  			


				  			


				  <Divider />

			      	

				      



				  	   <LinearProgress mode="determinate" value={initiative.signerCount} max={initiative.targetNumber}/>

				  	   <div>
				  	   	<h2>{initiative.signerCount} / {initiative.targetNumber} podrzavaoca inicijative</h2>
				  	   </div>

				  	    <LinearProgress 
									mode="determinate" 
									value={Math.floor((nowSeconds - startSeconds) / 3600)} 
									max={Math.floor((endSeconds - startSeconds) / 3600)}/>

				  	   <div>
				  	   	<h2>{Math.floor((endSeconds - nowSeconds)/3600)} h preostalo</h2>
				  	   </div>

			





				  <Divider />


				  <Card style={cardStyle}>
				 	<CardText>
						   <div className="ql-editor" style={qlStyle}>
							   <p dangerouslySetInnerHTML={{__html: (this.text() ? this.text().text : "" )}}>

							   </p>
						</div>
					</CardText>

				   </Card>

			     

			      <InitiativeDetailsTabs initiativeId={initiative._id}/>


			      <Dialog
			          title="Prikaz podataka"
			          actions={actions}
			          modal={true}
			          open={this.state.open}
			        >
			          Prikazati lične podatke prilikom podržavanja inicijative?
			        </Dialog>

			</div>
			<div className="col-md-2">
			</div>
		</div>
		) 
	}
}

//<SetButton label1="Podrzati inicijativu" label2="Inicijativa podrzana :)" clicked={false} />
/*
		    				<RaisedButton label="Like" primary={true} fullWidth={true} icon={<ActionCheckCircle/>} />
		    				<RaisedButton 
		    					label="Dislike" 
		    					secondary={true}  
		    					fullWidth={true}
		    					icon={<ActionCheckCircle />}
		    					
		    					/>





		    					<div className="row" style={{marginBottom:"200px", paddingTop:"50px"}}>
					      <div className="col-md-6">


					      <div className="row">
					      	<div className="col-md-5" style={{textAlign:"right", paddingTop:"55"}}>
					      	{daysElement}
					      	</div> 
					      	<div className="col-md-4">
					      <span >
					      	<ReactCountdownClock seconds={seconds}
		                     color="rgb(0, 188, 212)"
		                     alpha={0.9}
		                     size={150}
		                     timeFormat="hms"
		                     //onComplete={myCallback} 
		                     style={{height:"200px"}}
		                     />
		                     
		                  </span>  

		                  </div> 
		                  <div className="col-md-3" style={{paddingTop:"55"}}>
		                  	<h1 style={{color:"rgb(0, 188, 212)"}}> left</h1>
		                  </div>
						</div>



					      </div>
					      <div className="col-md-6">
					      		dscd
					      		<ReactCountdownClock seconds={60}
		                     color="rgb(0, 188, 212)"
		                     alpha={0.9}
		                     size={200}
		                     paused={true} 
		                     pausedText={"500/1000"}
		                     />
					      </div>
				  	  </div>


		let days = Math.floor(seconds / Math.pow(60, 3));
		
		let daysElement = (days === 1) ? 
							<span><h1 style={{color:"rgb(0, 188, 212)"}}>{days} day and</h1></span> : 
							<span><h1 style={{color:"rgb(0, 188, 212)"}}>{days} days and</h1></span>;

				  	  */