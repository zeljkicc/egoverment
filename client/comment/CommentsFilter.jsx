import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';

import FilterList from 'material-ui/svg-icons/content/filter-list';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

import Divider from 'material-ui/Divider';

export default class CommentsFilter extends Component {
  constructor(){
  	super();

  	this.state = {
  		show: false,
  		sort: "first"
  	}
  }

  handleTouchTapFilter(event){
  	event.preventDefault();

  	this.setState({
  		show: !this.state.show
  	});

  }


    handleTouchTap(data, event){
    	event.preventDefault();

    	this.props.handleSortChange(data);

    	this.setState({
  		sort: data
  		});
 	}
  

  
  
  render() {
  	let filter = this.state.show ? 

  	<div className="row">
		<div className="col-md-4">
			<h3>VREME</h3>
			<Divider />
	  		<FlatButton label="Najnovije" fullWidth={true} onTouchTap={this.handleTouchTap.bind(this, "first")}
	  		labelStyle={(this.state.sort === "first") ? {fontWeight:"bold"} : ""}/>
	  		<FlatButton label="Najstarije" fullWidth={true} onTouchTap={this.handleTouchTap.bind(this, "last")}
	  		labelStyle={(this.state.sort === "last") ? {fontWeight:"bold"} : ""}/>
		</div>
		<div className="col-md-4">
			<h3>LIKE</h3>
			<Divider />
			<FlatButton label="Prvo najvisi" fullWidth={true} onTouchTap={this.handleTouchTap.bind(this, "highestLikes")}
			labelStyle={(this.state.sort === "highestLikes") ? {fontWeight:"bold"} : ""}/>
	  		<FlatButton label="Prvo najnizi" fullWidth={true} onTouchTap={this.handleTouchTap.bind(this, "lowestLikes")}
	  		labelStyle={(this.state.sort === "lowestLikes") ? {fontWeight:"bold"} : ""}/>
		</div>
		<div className="col-md-4">
			<h3>DISLIKE</h3>
			<Divider />
			<FlatButton label="Prvo najvisi" fullWidth={true} onTouchTap={this.handleTouchTap.bind(this, "highestDislikes")}
			labelStyle={(this.state.sort === "highestDislikes") ? {fontWeight:"bold"} : ""}/>
	  		<FlatButton label="Prvo najnizi" fullWidth={true} onTouchTap={this.handleTouchTap.bind(this, "lowestDislikes")}
	  		labelStyle={(this.state.sort === "lowestDislikes") ? {fontWeight:"bold"} : ""}/>
		</div>
	</div> : "";



    return (
    	<div>
    		 <FlatButton
		      label="Filter"
		      icon={<FilterList />}
		      onTouchTap={this.handleTouchTapFilter.bind(this)}
		    />
		    {filter}
    	</div>
      
    );
  }
}

/*<FlatButton label="Login" style={{color:"white", marginTop:"6px"}} onTouchTap={this.handleRequestLogin.bind(this)}/>
  handleRequestLogin(){
  	event.preventDefault();
  	FlowRouter.go("/login");
  }
*/