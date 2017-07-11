
import React, {Component} from 'react';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Search from 'material-ui/svg-icons/action/search';

import FlatButton from 'material-ui/FlatButton';


export default class Logged extends Component {

  handleLogOut(event){
  	event.preventDefault();

  	Meteor.logout(function(error){
  		if(error){
        		Bert.alert('Greska prilikom odjave. Pokusajte ponovo.',
					'danger', 'fixed-top', 'fa-frown-o');
        	}
        	else{
        		Bert.alert('Uspesna odjava!',
					'success', 'fixed-top', 'fa-check');

        		FlowRouter.go('/');
        	}
  	})
  }


  render() {

  	let style = {
  		color:"white"
  	}

    return (
      <IconMenu style={style}
		    iconButtonElement={
		      <div>
		    	<IconButton style={style} onTouchTap={this.props.searchClick}><Search color="white"/></IconButton>
		      	<IconButton style={style}><MoreVertIcon color="white"/></IconButton>
		      </div>
		  	}
		    targetOrigin={{horizontal: 'right', vertical: 'top'}}
		    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		    
		  >
		    <MenuItem primaryText="Sign out" onTouchTap={this.handleLogOut.bind(this)}/>
	  </IconMenu>
    );
  }
}


