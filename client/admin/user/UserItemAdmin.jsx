import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import {
  TableRow,
  TableRowColumn
} from 'material-ui/Table';


export default class UserListAdmin extends Component {
	constructor(){
		super();


	}


  
  render() {
	
	let date = null;
    date = this.props.user.profile.date ? moment(this.props.user.profile.date).locale("sr").format('LLLL') : null;

    return (
        <TableRow>
            <TableRowColumn>{this.props.i + 1}.</TableRowColumn>
            <TableRowColumn>{this.props.user.profile.firstname ? this.props.user.profile.firstname : ""}</TableRowColumn>
            <TableRowColumn>{this.props.user.profile.lastname ? this.props.user.profile.lastname : ""}</TableRowColumn>
            <TableRowColumn>{this.props.user.profile.place ? this.props.user.profile.place : ""}</TableRowColumn>
            <TableRowColumn>{date ? date : ""}</TableRowColumn>
          </TableRow>
    );
  }
}