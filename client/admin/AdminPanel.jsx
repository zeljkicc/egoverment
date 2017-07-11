import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';

import {Card, CardTitle, CardText, CardActions, CardMedia} from 'material-ui/Card';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MDSpinner from "react-md-spinner";

export default class AdminPanel extends TrackerReact(Component) {
  


	onClickHandle(path){
		FlowRouter.go(path);
	}


  render() {
	  	  
		if(!Meteor.userId()){
			return(
			<div style={{textAlign: "center", marginTop:"50px"}}>
				<h1 style={{color: "rgb(0, 188, 212)"}}>Morate se ulogovati prvo</h1>
			</div>
			);
		}
		else {
				
				if(!Meteor.user()){
					if(!Meteor.user()){
						return(<div style={{textAlign:"center", marginTop:"30px"}}><MDSpinner /></div>);
					}
				}
				
				if(Meteor.user().profile.role !== "admin"){
				return(
				<div style={{textAlign: "center", marginTop:"50px"}}>
					<h1 style={{color: "rgb(0, 188, 212)"}}>
						Morate imati admin privilegije da biste pristupili ovom delu
					
					</h1>
				</div>
				);
			}
		}

  		const style={
			textAlign:"center"
		}

		let styleh2={
			color: "rgb(0, 188, 212)",
			marginTop:"0px"
		}

		let itemStyle={
			marginTop:"5px",
			marginBottom:"5px"
		}




    return (
      	<ReactCSSTransitionGroup
          transitionName="route"
          transitionEnterTimeout={600}
          transitionAppearTimeout={600}
          transitionLeaveTimeout={400}
          transitionAppear={true}
          >
      			<div className="row" style={{marginTop:"20px"}}>
      				<div className="col-sm-1 col-lg-1 col-md-1">
      				</div>
      				<div className="col-sm-10 col-lg-10 col-md-10">
					  	<h1 style={styleh2}>Admin Panel</h1>
					  	<hr/>
						<div className="row">
							<div className="col-sm-4 col-lg-4 col-md-4">

								<div className="cardHover" style={itemStyle} onClick={()=>this.onClickHandle("/admin/initiatives")}>
									<Card>
										<CardMedia
									      overlay={<CardTitle title="Inicijative" style={{cursor: "pointer"}} />}
									    >
									      <img src="/img/admin1.jpg" alt="" />
									    </CardMedia>
									</Card>

								</div>

							</div>
							<div className="col-sm-4 col-lg-4 col-md-4">
								<div className="cardHover" style={itemStyle} onClick={()=>this.onClickHandle("/admin/users")}>
									<Card>
										<CardMedia
									      overlay={<CardTitle title="Korisnici" style={{cursor: "pointer"}} />}
									    >
									      <img src="/img/admin2.png" alt="" />
									    </CardMedia>
									</Card>

								</div>
							</div>
							<div className="col-sm-4 col-lg-4 col-md-4">

								<div className="cardHover" style={itemStyle} onClick={()=>this.onClickHandle("/admin/comments")}>
									<Card>
										<CardMedia
									      overlay={<CardTitle title="Komentari" style={{cursor: "pointer"}} />}
									    >
									      <img src="/img/admin3.png" alt="" />
									    </CardMedia>
									</Card>

								</div>

							</div>
						</div>
						<div className="col-sm-1 col-lg-1 col-md-1">
      					</div>
					 </div>
				 </div>
		</ReactCSSTransitionGroup>
    );
  }
}