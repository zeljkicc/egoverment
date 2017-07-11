import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import Toggle from 'material-ui/Toggle';


export default class CommentItemAdmin extends Component {
	constructor(props){
		super(props);


	}


  handleDeleteClick(event){
    event.preventDefault();

    Meteor.call("deleteComment", this.props.comment._id, function(error){
      if(error){
        Bert.alert('Greska prilikom brisanja komentara. Pokusajte ponovo.',
          'danger', 'fixed-top', 'fa-frown-o');
      }
      else{
        Bert.alert('Uspesno obrisan komentar.',
          'success', 'fixed-top', 'fa-check');
      }
    });
  }


  
  render() {

    const style = {
      margin: 12,
    };

    let date = moment(this.props.comment.date).locale("sr").format('LLLL');

    return (
        <TableRow>
            <TableRowColumn>{this.props.i + 1}.</TableRowColumn>
            <TableRowColumn>{this.props.comment.text}</TableRowColumn>
            <TableRowColumn>{date}</TableRowColumn>
            <TableRowColumn>{this.props.comment.likes}</TableRowColumn>
            <TableRowColumn>{this.props.comment.dislikes}</TableRowColumn>
            <TableRowColumn>
              <div>
                <RaisedButton label="Delete" style={style} secondary={true} onTouchTap={this.handleDeleteClick.bind(this)}/>
              </div>
            </TableRowColumn>
        </TableRow>
    );
  }
}