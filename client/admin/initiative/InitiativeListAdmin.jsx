import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';

import InitiativeItemAdmin from './InitiativeItemAdmin';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

import MDSpinner from "react-md-spinner";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import RaisedButton from 'material-ui/RaisedButton';


import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export default class InitiativeListAdmin extends TrackerReact(Component) {
	constructor(props){
		super(props);

    this.state = {
      sort: "first_begin",
      skip: 0,
      limit: 10,
      slideIndex: 0,
    }

    this.handleSortClick = this.handleSortClick.bind(this);

	}
	
	switchSort(){
		let sort = null;
    //console.log("REcimo ovde smo: " + this.state.sort);
    switch(this.state.sort){
      case "first_begin":
        sort = {sort: {date: -1}};
      break;
      case "last_begin":
        sort = {sort: {date: 1}};
      break;
       case "first_end":
        sort = {sort: {endDate: -1}};
      break;
      case "last_end":
        sort = {sort: {endDate: 1}};
      break;
      case "atoz":
        sort = {sort: {name: -1}};
      break;
      case "ztoa":
        sort = {sort: {name: 1}};
      break;
      case "first_front":
        sort = {sort: {front: -1}};
      break;
      case "last_front":
        sort = {sort: {front: 1}};       
      break;
      default:
        sort = {sort: {date: -1}};
      }

      sort.skip = this.state.skip;
      sort.limit = this.state.limit;
	  
	  return sort;
	}

  initiatives(){
    let sort = this.switchSort();
    return Initiatives.find({}, sort).fetch();
  }

   handleLoadMore(event){
    event.preventDefault();
    this.setState({
      limit: this.state.limit + 10
    })
  }
    
   handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  handleSortClick(sortVal){
    console.log(sortVal);
    console.log(this.state.sort);
    switch(sortVal){
      case "name":
        if(this.state.sort === "atoz"){
          this.setState({
            sort: "ztoa"
          });
        }
        else{
          this.setState({
            sort: "atoz"
          });
        }
      break;
      case "time_begin":
         if(this.state.sort === "first_begin"){
          this.setState({
            sort: "last_begin"
          });
        }
        else{
          this.setState({
            sort: "first_begin"
          });
        }
      break;
      case "time_end":
        if(this.state.sort === "first_end"){
          this.setState({
            sort: "last_end"
          });
        }
        else{
          this.setState({
            sort: "first_end"
          });
        }
      break;
      case "front":
        if(this.state.sort === "first_front"){
          this.setState({
            sort: "last_front"
          });
        }
        else{
          this.setState({
            sort: "first_front"
          });
        }
      break;
      default:
         this.setState({
            sort: "first_begin"
          });
      }
  }

  handleCreateClick(){
    FlowRouter.go("/createinitiative");
  }

 handleMapClick(event){
 	console.log(event);
 	this.setState({
 		location: event.latlng
 	});
 }


 getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position, error){
        	if(error){
        		 Bert.alert('Greska prilikom geolociranja.',
					'danger', 'fixed-top', 'fa-frown-o');
        	}
        	else{
	        	this.setState({
	        		userLocation: [position.coords.longitude, position.coords.latitude]
	        	});
        	}
        });
    } else {
    	this.setState({
        		userLocation: [43.30194579605323, 21.884765625]
        	});
        Bert.alert('Uredjaj ne podrzava geolokaciju.',
					'danger', 'fixed-top', 'fa-frown-o');
    }
}
  
  render() {
	  
	  let sort = this.switchSort();
	 Meteor.subscribe("limitInitiatives", sort);
	  
    let initiatives = null;
  	initiatives = this.initiatives().map((item, i) => {
  		return <InitiativeItemAdmin key={i} i={i} initiative={item}/>;
  	});
      
      console.log(initiatives);
      
    let initiativesMarkers = null;
    initiativesMarkers = this.initiatives().map((item, i) => {
        if(item.location !== undefined && item.location.lat !== undefined && item.location.lng !== undefined){
                return <Marker 
                            key={i}
                            position={[item.location.lat, item.location.lng]} 
                            icon={L.icon({ iconUrl: '../img/marker-icon.png' })}
                            zIndexOffset={5}
                            map = {this.props.map}
                           >
                     <Popup>
                       <div>
                       
                           <b>{item.name}</b>
                           <hr/>
                           {item.description}
                           <hr/>
						   <a style={{cursor: "pointer"}} onClick={() => FlowRouter.go("/initiativeslist/" + item._id)}>Detalji</a>
                       </div>
                     </Popup>
                </Marker>
        }
  		
  	});
      
      console.log(initiativesMarkers);
      
    const position = [43.30194579605323, 21.884765625];

    let styleh2 = {
      color: "rgb(0, 188, 212)"
    }

    const style = {
      marginLeft: 20,
      marginTop: 20
    };

    if(!initiatives){
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

            <div className="col-md-12" style={{paddingRight:"0px", paddingLeft:"0px"}}>
                
                
                <Tabs
                  onChange={this.handleChange}
                  value={this.state.slideIndex}
                >
                  <Tab label="Lista inicijativa" value={0} />
                  <Tab label="Mapa inicijativa" value={1} />
                </Tabs>
                <SwipeableViews
                  index={this.state.slideIndex}
                  onChangeIndex={this.handleChange}
                >
                  <div>
                    <FloatingActionButton style={style} mini={true} onTouchTap={this.handleCreateClick}>
                        <ContentAdd />
                    </FloatingActionButton>
                      
                      
                      <Table>
                        <TableHeader  displaySelectAll={false}>
                          <TableRow>
                              <TableHeaderColumn>Broj</TableHeaderColumn>
                              <TableHeaderColumn onTouchTap={() => this.handleSortClick("name")} style={cursor}>Ime 
                              {(this.state.sort === "atoz") ? <KeyboardArrowUp /> : ""}
                              {(this.state.sort === "ztoa") ? <KeyboardArrowDown /> : ""}
                            </TableHeaderColumn>
                            <TableHeaderColumn onTouchTap={() => this.handleSortClick("time_begin")} style={cursor}>Datum pocetka 
                              {(this.state.sort === "last_begin") ? <KeyboardArrowUp /> : ""}
                              {(this.state.sort === "first_begin") ? <KeyboardArrowDown /> : ""}
                            </TableHeaderColumn>
                            <TableHeaderColumn onTouchTap={() => this.handleSortClick("time_end")} style={cursor}>Datum zavrsetka
                              {(this.state.sort === "last_end") ? <KeyboardArrowUp /> : ""}
                              {(this.state.sort === "first_end") ? <KeyboardArrowDown /> : ""}
                            </TableHeaderColumn>
                            <TableHeaderColumn onTouchTap={() => this.handleSortClick("front")} style={cursor}>Postavljena na pocetnoj
                              {(this.state.sort === "last_front") ? <KeyboardArrowUp /> : ""}
                              {(this.state.sort === "first_front") ? <KeyboardArrowDown /> : ""}
                            </TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                          </TableRow>
                        </TableHeader>
                        <TableBody>

                              {initiatives}

                        </TableBody>
                      </Table>
                      <RaisedButton label={"Prikaži još"} primary={true} onTouchTap={this.handleLoadMore.bind(this)}/>
                      
                      
                      
                  </div>
                  <div style={{padding: "10"}}>
                    
                      
                      
                      <Map 
							center={position} 
							zoom={13} 
							style={{ height: 525 }}
						    onCLick={this.handleMapClick.bind(this)}
							
							>
                           <TileLayer
                             url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                           />
                           {initiativesMarkers}
		              </Map>
                      
                  </div>
                </SwipeableViews>
                
                
                
                


              
            </div>
          </div>
      </ReactCSSTransitionGroup>

    );
  }
}