import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { Accounts } from 'meteor/accounts-base';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class UpdateProfile extends TrackerReact(Component) {

constructor(props){
	super(props);
	
	let user = Meteor.user();
	
	this.state={
		email:"",
		firstname:"",
		lastname:"",
		place:"",
		imgSrc:"/img/profile.png",
		set: false
	}


}
    
componentDidMount(){
    this.user();
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
    
user(){
	if(!this.state.set){
		let user = Meteor.users.findOne({_id: Meteor.userId()});
		if(user){
        this.setState({
            email: user.emails[0].address,
            firstname: user.profile.firstname,
            lastname: user.profile.lastname,
            place: user.profile.place,
            imgSrc: user.profile.imgSrc,
			set: true
        })
    }
	}
    
    
}


handleRequestCreate(event){
	event.preventDefault();
	
	
	Meteor.call("updateProfile", {
		_id: Meteor.userId(),
		email: this.state.email,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        place: this.state.place,
        imgSrc: this.state.imgSrc
		
	}, function(error){
		if(!error){
        	Bert.alert('Uspesno ažuriran profil!',
					'success', 'fixed-top', 'fa-check');
			
			FlowRouter.go("/");
		}
		else{
			Bert.alert('Greska prilikom ažuriranja profila. Pokušajte ponovo.',
					'danger', 'fixed-top', 'fa-frown-o');
		}
		
	});

	
}

startCamera(){
	_this = this;
	MeteorCamera.getPicture(
	{
		width:200,
		height:200,
		quality:50
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
    
    this.user();
	
	let imgStyle={
		width:"200px",
		height:"200px",
		borderRadius:"100px",
		margin:"auto"
	}
	
	if(!Meteor.userId()){
			return(
			<div style={{textAlign: "center", marginTop:"50px"}}>
				<h1 style={{color: "rgb(0, 188, 212)"}}>Morate se ulogovati prvo</h1>
			</div>
			);
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
                    <div style={{marginRight:"5px", marginLeft:"5px"}}>
                        <h1 style={{color:"rgb(0, 188, 212)"}}>Ažuriranje profila</h1>
                        <hr/>
                    </div>
					<div className="formCreate">
						<form>
							<div style={{textAlign:"center"}}>
								<img style={imgStyle} src={this.state.imgSrc} className="cardHover"
									onTouchTap={this.startCamera.bind(this)}>
									
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
						      label="Ažuriraj nalog"
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