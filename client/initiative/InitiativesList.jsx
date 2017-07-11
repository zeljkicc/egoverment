import React, {Component} from 'react';

import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {List, ListItem} from 'material-ui/List';

import RaisedButton from 'material-ui/RaisedButton';

import InitiativeSingle from './InitiativeSingle';

import MDSpinner from "react-md-spinner";

import Filter from "./Filter";

import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


export default class InitiativesList extends  TrackerReact(Component) {
	constructor(props){
		super(props);

		this.state = {
			sort: "first",
            skip: 0,
            limit: 10,
			slideIndex: 0,
			word: this.props.word ? this.props.word : null
		}

		//alert("Props");
		//alert(this.props.word);
		/*if(props.text){
			alert(props.text);
			Meteor.subscribe
		}*/
		
	}
	
	switchSort(){
		sort = null;
		switch(this.state.sort){
			case "first":
				sort = {sort: {date: -1}};
			break;
			case "last":
				sort = {sort: {date: 1}};
			break;
			case "atoz":
				sort = {sort: {name: -1}};
			break;
			case "ztoa":
				sort = {sort: {name: 1}};
			break;
			case "highest":
				sort = {sort: {rating: -1}};
			break;
			case "lowest":
				sort = {sort: {rating: 1}};				
			break;
			default:
				sort = {sort: {date: -1}};
		}
		sort.skip = this.state.skip;
        sort.limit = this.state.limit;
		
		return sort;
		
	}
	

	initiatives(){
		
		//console.log("REcimo ovde smo: " + this.state.sort);
		let sort = this.switchSort();    
		return Initiatives.find({}, sort).fetch();
		
		
	}

	initiativesFront(){
		return Initiatives.find({front: true}, {sort: {date: -1}}).fetch();
	}

	handleSortChange(value){
		this.setState({
			sort: value
		});

		console.log(value);
	}
    
    showMore(){
		this.setState({
            limit: this.state.limit + 10
        });
    }
	
	   handleChange = (value) => {
			this.setState({
			  slideIndex: value,
			});
		  };


render(){
	
	if(!this.state.word){
		let sort = this.switchSort(); 
		Meteor.subscribe("limitInitiatives", sort);
	}
	else{
		Meteor.subscribe("textInitiatives", this.state.word);
	}
	 
	
	const position = [43.30194579605323, 21.884765625];


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
	
	
	//console.log(this.initiatives());
	let items = null;
	if(this.props.front){
		items = this.initiativesFront();
	}
	else{
		items = this.initiatives();
	}
	

	items = items.map((item, i) => {
		return <InitiativeSingle key={item._id} _id={item._id} text={item.text} description={item.description}
		name={item.name} user={item.user} date={item.date} i={i} user={Meteor.users.findOne({"_id":item.user})}/>
	});

		if(!items){
			return(<div><MDSpinner /></div>);
		}
	
	return(
		<ReactCSSTransitionGroup
					transitionName="route"
					transitionEnterTimeout={600}
					transitionAppearTimeout={600}
					transitionLeaveTimeout={400}
					transitionAppear={true}
					>
			
					
					
					
					
					
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
                    
					
                      <div className="row">
                        {
                            (this.props.front)
                            ?
                            ""
                            :
                            <div className="col-md-2">
						    </div>
                        }
						
						<div className={(this.props.front) ? "col-md-12" : "col-md-8"}>	
                            {
                                (this.props.front)
                                ?
                                    ""
                                :
                                    <div style={{marginRight:"5px", marginLeft:"5px"}}>
                                        <h1 style={{color:"rgb(0, 188, 212)"}}>Lista inicijativa</h1>
                                        <hr/>
                                    </div>
                            }
                            
							{
								(this.props.front)
								?
								""
								:
								<Filter handleSortChange={this.handleSortChange.bind(this)}/>
							}		
                            
							<ReactCSSTransitionGroup
							transitionName="item"
							transitionEnterTimeout={600}
							transitionLeaveTimeout={400}
							>
							
		      				    {items}
                                {(!this.props.front) ? <RaisedButton label="Prikaži više" onTouchTap={this.showMore.bind(this)}/> : ""}
		      				</ReactCSSTransitionGroup>
		      			</div>
		      			{
                            (this.props.front)
                            ?
                            ""
                            :
                            <div className="col-md-2">
						    </div>
                        }
		      		</div>
					
                      
                      
                  </div>
				  
				  
                  <div style={{padding: "10"}}>
                    
                      
                      
                      <Map 
							center={position} 
							zoom={13} 
							style={{ height: 525 }}
							
							>
                           <TileLayer
                             url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                           />
                           {initiativesMarkers}
		              </Map>
                      
                  </div>
                </SwipeableViews>
				
				
		      	

    	</ReactCSSTransitionGroup>

		)
	}
}



