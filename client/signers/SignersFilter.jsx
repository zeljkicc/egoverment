import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';

import FilterList from 'material-ui/svg-icons/content/filter-list';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

import Divider from 'material-ui/Divider';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class SignersFilter extends Component {
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
  	<ReactCSSTransitionGroup
					transitionName="filter"
					transitionEnterTimeout={600}
					transitionAppearTimeout={600}
					transitionLeaveTimeout={400}
					transitionAppear={true}
					>
	  	<div className="row">
		  	<div className="col-md-4">
		  		<h3>IME</h3>
		  		<Divider />
		  		<FlatButton label="A do Z" name="AdoZ"  fullWidth={true} onTouchTap={this.handleTouchTap.bind(this, "atozName")} 
		  		  labelStyle={(this.state.sort === "atoz") ? {fontWeight:"bold"} : ""}/>
		  		<FlatButton label="Z do A" fullWidth={true} onTouchTap={this.handleTouchTap.bind(this, "ztoaName")}
		  		labelStyle={(this.state.sort === "ztoa") ? {fontWeight:"bold"} : ""}/>
			</div>
			<div className="col-md-4">
				<h3>VREME</h3>
				<Divider />
		  		<FlatButton label="Najnovije" fullWidth={true} onTouchTap={this.handleTouchTap.bind(this, "first")}
		  		labelStyle={(this.state.sort === "first") ? {fontWeight:"bold"} : ""}/>
		  		<FlatButton label="Najstarije" fullWidth={true} onTouchTap={this.handleTouchTap.bind(this, "last")}
		  		labelStyle={(this.state.sort === "last") ? {fontWeight:"bold"} : ""}/>
			</div>
			<div className="col-md-4">
				<h3>GRAD</h3>
				<Divider />
				<FlatButton label="Prvo najvisi" fullWidth={true} onTouchTap={this.handleTouchTap.bind(this, "atozCity")}
				labelStyle={(this.state.sort === "highest") ? {fontWeight:"bold"} : ""}/>
		  		<FlatButton label="Prvo najnizi" fullWidth={true} onTouchTap={this.handleTouchTap.bind(this, "ztoaCity")}
		  		labelStyle={(this.state.sort === "lowest") ? {fontWeight:"bold"} : ""}/>
			</div>
		</div> 
	</ReactCSSTransitionGroup>: "";



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