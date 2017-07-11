import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';

import UserItemAdmin from './UserItemAdmin';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

import MDSpinner from "react-md-spinner";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class UserListAdmin extends TrackerReact(Component) {
	constructor(){
		super();
		
		this.state = {
			skip: 0,
			limit: 10
		}

	}

  users(){
    return Meteor.users.find({}, {fields: {emails: 1, profile: 1}}).fetch();
  }
  
  showMore(){
        this.setState({
            limit: this.state.limit + 10
        })
   }
  
  render() {
	  
	  Meteor.subscribe("limitUsers", {
		  limit: this.state.limit
	  });
	  
      let styleh2 = {
      color: "rgb(0, 188, 212)"
    }
      
    let users = null;
  	users = this.users().map((item, i) => {
  		return <UserItemAdmin key={i} i={i} user={item}/>;
  	});

    if(!users){
      return(<div><MDSpinner /></div>);
    }
	
	

    return (
        
        <ReactCSSTransitionGroup
          transitionName="route"
          transitionEnterTimeout={600}
          transitionAppearTimeout={600}
          transitionLeaveTimeout={400}
          transitionAppear={true}
          >

          <div className="row">
            <div className="col-md-1">
            </div>
            <div className="col-md-10">
                <h1 style={styleh2}>Lista korisnika</h1>
                <hr/>
                <Table>
                    <TableHeader  displaySelectAll={false}>
                      <TableRow>
                          <TableHeaderColumn>Broj</TableHeaderColumn>
                        <TableHeaderColumn>Ime</TableHeaderColumn>
                        <TableHeaderColumn>Prezime</TableHeaderColumn>
                        <TableHeaderColumn>Grad ili mesto</TableHeaderColumn>
                        <TableHeaderColumn>Datum registracije</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users}
                    </TableBody>
                </Table>
				<RaisedButton label="Prikaži više" primary={true} onTouchTap={this.showMore.bind(this)}/>
            </div>
            <div className="col-md-1">
            </div>
          </div>
        </ReactCSSTransitionGroup>
    );
  }
}