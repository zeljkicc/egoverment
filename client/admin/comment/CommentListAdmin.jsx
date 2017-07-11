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

import CommentItemAdmin from './CommentItemAdmin';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

import MDSpinner from "react-md-spinner";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

export default class CommentListAdmin extends TrackerReact(Component) {
	constructor(){
		super();
	
	
    this.state = {
      sort: "first",
      skip: 0,
      limit: 10
    }

	}

	switchSort(){
		 let sort = null;
		switch(this.state.sort){
		  case "first":
			sort = {sort: {date: -1}};
		  break;
		  case "last":
			sort = {sort: {date: 1}};
		  break;
		  case "highestLikes":
			sort = {sort: {likes: -1}};
		  break;
		  case "lowestLikes":
			sort = {sort: {likes: 1}};
		  break;
		  case "highestDislikes":
			sort = {sort: {dislikes: -1}};
		  break;
		  case "lowestDislikes":
			sort = {sort: {dislikes: 1}};
		  break;
		  default:
			sort = {sort: {date: -1}};
		  }

		  sort.skip = this.state.skip;
		  sort.limit = this.state.limit;
		  
		  return sort;
	}

  comments(){
  
	let sort = this.switchSort();
    return Comments.find({}, sort).fetch();
  }

  handleLoadMore(event){
    event.preventDefault();
	  
    this.setState({
	  limit: this.state.limit + 10
    })
  }
  

    handleSortClick(sortVal){
    switch(sortVal){
      case "date":
        if(this.state.sort === "first"){
          this.setState({
            sort: "last"
          });
        }
        else{
          this.setState({
            sort: "first"
          });
        }
      break;
      case "likes":
         if(this.state.sort === "highestLikes"){
          this.setState({
            sort: "lowestLikes"
          });
        }
        else{
          this.setState({
            sort: "highestLikes"
          });
        }
      break;
      case "dislikes":
        if(this.state.sort === "highestDislikes"){
          this.setState({
            sort: "lowestDislikes"
          });
        }
        else{
          this.setState({
            sort: "highestDislikes"
          });
        }
      break;
      default:
         this.setState({
            sort: "first_begin"
          });
      }
  }


  
  render() {
	  
	  let sort = this.switchSort();
	  Meteor.subscribe("limitComments", sort);
	  
    let comments = null;
  	comments = this.comments().map((item, i) => {
  		return <CommentItemAdmin key={i} i={i} comment={item}/>;
  	});

    let styleh2 = {
      color: "rgb(0, 188, 212)"
    }

    if(!comments){
      return(<div><MDSpinner /></div>);
    }

    let cursor = {
      cursor: "pointer"
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
              <h1 style={styleh2}>Lista komentara</h1>
              <hr/>
              <Table>
              	<TableHeader  displaySelectAll={false}>
                  <TableRow>
              		  <TableHeaderColumn>Broj</TableHeaderColumn>
              		  <TableHeaderColumn>Tekst</TableHeaderColumn>
                    <TableHeaderColumn onTouchTap={() => this.handleSortClick("date")} style={cursor}>Postavljen
                      {(this.state.sort === "last") ? <KeyboardArrowUp /> : ""}
                      {(this.state.sort === "first") ? <KeyboardArrowDown /> : ""}
                    </TableHeaderColumn>
                    <TableHeaderColumn onTouchTap={() => this.handleSortClick("likes")} style={cursor}>Broj like-ova
                      {(this.state.sort === "lowestLikes") ? <KeyboardArrowUp /> : ""}
                      {(this.state.sort === "highestLikes") ? <KeyboardArrowDown /> : ""}
                    </TableHeaderColumn>
                    <TableHeaderColumn onTouchTap={() => this.handleSortClick("dislikes")} style={cursor}>Broj dislike-ova
                      {(this.state.sort === "lowestDislikes") ? <KeyboardArrowUp /> : ""}
                      {(this.state.sort === "highestDislikes") ? <KeyboardArrowDown /> : ""}
                    </TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                  </TableRow>
              	</TableHeader>
              	<TableBody>

              		  {comments}

              	</TableBody>
              </Table>
              <RaisedButton label={"Prikaži još"} primary={true} onTouchTap={this.handleLoadMore.bind(this)}/>
            </div>
            <div className="col-md-1">
            </div>
          </div>
      </ReactCSSTransitionGroup>

    );
  }
}