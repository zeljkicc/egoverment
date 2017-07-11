import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import Toggle from 'material-ui/Toggle';

import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';

import MediumEditor from './MediumEditor';

//import QuillEditor from './QuillEditor';

import FileUpload from 'material-ui/svg-icons/file/file-upload';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import IconButton from 'material-ui/IconButton';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ReactQuill from 'react-quill';

import {
  Step,
  Stepper,
  StepButton,
  StepContent
} from 'material-ui/Stepper';

import PlainStepConnector from 'material-ui//Stepper/StepConnector';

export default class CreateInitiative extends Component {

constructor(){
	super();

	this.state={
		name:"",
		description:"",
		text:"",
		showData:true,
		endDate:null,
		value24: null,
		targetNumber: 100,
		stepIndex: 0, //treba izmeniti da se ne smesta u bazu podataka ovaj state atribut
		finished: false,
		location:[43.30194579605323, 21.884765625],
		userLocation:null,
		front: false,
		imageSrc: "/img/initiative-default.jpg"
	}


}

/*componentDidMount(){
	this.getLocation().bind(this);
}*/

handleChange(event) {

	const target = event.target;

	console.log(target.type);
    const value = target.type === 'checkbox' ? target.toggled : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


handleRequestCreate(event){

	

	Meteor.call('createInitiative', {
		name: this.state.name,
		description: this.state.description,
		text: this.state.text,
		showData: this.state.showData,
		endDate: this.state.endDate,
		value24: this.state.value24,
		targetNumber: this.state.targetNumber,
		date: new Date(),
		user: Meteor.userId(),
		finished: this.state.finished,
		location: this.state.location,
		front: this.state.front,
		imageSrc: this.state.imageSrc
	}, function(error){

        	if(error){
        		Bert.alert('Greska prilikom kreiranja inicijative. Pokusajte ponovo.',
					'danger', 'fixed-top', 'fa-frown-o');
        	}
        	else{
        		Bert.alert('Uspesno kreirana inicijativa!',
					'success', 'fixed-top', 'fa-check');

        		FlowRouter.go('/initiativeslist');
        	}




	})
}

handleTimePickerChange(event, date){
	this.setState({
		value24: date
	});
}

handleDatePickerChange(event, date){
	this.setState({
		endDate: date
	});
}

passedChange(value){
	this.setState({
		text:value
	})
}


//za stepper-a////////////////////////
handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex < 3) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label="Sledeće"
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Prethodno"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }
 ////////////////////////////////////////////

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

handleUploadPicture(event){
	event.preventDefault();

	var elem = document.getElementById("fileupload");
    elem.click();

}

handleFiles(event){
	event.preventDefault();
	
	let _this = this;

	let fileList = document.getElementById("fileupload").files;

			if (!fileList.length) {
				console.log("No files selected!");
			} else {
				
				var reader = new FileReader();

				reader.onload = function (e) {
					document.getElementById("img-main").src = e.target.result;
					
					_this.setState({
							imageSrc: e.target.result
					});
				}
				
				reader.readAsDataURL(fileList[0]);

				
			}
		
}


render(){
	
	if(!Meteor.userId()){
		return(
			<div style={{textAlign: "center", marginTop:"50px"}}>
				<h1 style={{color: "rgb(0, 188, 212)"}}>Morate se ulogovati prvo</h1>
			</div>
			);
	}
	
	const {stepIndex} = this.state;

	const position = [43.30194579605323, 21.884765625];

	let md8Style = {
		paddingLeft: "0px",
		paddingRight: "0px"
	}


	return(
		<ReactCSSTransitionGroup
          transitionName="route"
          transitionEnterTimeout={600}
          transitionAppearTimeout={600}
          transitionLeaveTimeout={400}
          transitionAppear={true}
          >
			<div className="row">
				<div className="col-md-2">
				</div>
				<div className="col-md-8" style={md8Style}>
                    <div style={{marginRight:"5px", marginLeft:"5px"}}>
                        <h1 style={{color:"rgb(0, 188, 212)"}}>Kreiranje inicijative</h1>
                        <hr/>
                    </div>
                    
					<div className="formCreate" style={{marginTop:"0px"}}>
						<form>
							<div style={{ margin: 'auto'}}>
						        <Stepper
						          activeStep={stepIndex}
						          linear={false}
						          orientation="vertical"
						          connector={<PlainStepConnector style={{marginLeft:"10px"}}/>}
						        >
						        	<Step>
							            <StepButton style={{marginLeft:"5px", paddingLeft:"0px"}} 
							            	onTouchTap={() => this.setState({stepIndex: 0})}>
							              Unesite osnovne podatke
							            </StepButton>
							            <StepContent style={{marginLeft:"10px", paddingLeft:"10px"}}>
							                <TextField
											  onChange={this.handleChange.bind(this)}
											  name="name"
											  value={this.state.name}
										      hintText="Upisite naziv inicijative"
										      floatingLabelText="Naziv inicijative"
										      fullWidth={true}
										    />

										    <TextField
										      onChange={this.handleChange.bind(this)}
										      name="description"
										      value={this.state.description}
										      hintText="Kratak opis inicajtive"
										      floatingLabelText="Opis inicijative"
										      fullWidth={true}
										      multiLine={true}
							      			  rows={2}
										    />
											
											<Toggle
											      label="Prikazi moje ime"
											      defaultToggled={this.state.showData}
											      style={{maxWidth:"250px"}}
											      onToggle={this.handleChange.bind(this)}
											      name="showData"
											    />


										   
							              {this.renderStepActions(0)}
							            </StepContent>
							        </Step>
									
							        <Step>
							            <StepButton onTouchTap={() => this.setState({stepIndex: 1})}>
							              Unesite tekst inicijative
							            </StepButton>
							            <StepContent style={{marginLeft:"10px", paddingLeft:"10px"}}>
							              
									
										  <TextField
										      onChange={this.handleChange.bind(this)}
										      name="text"
										      value={this.state.text}
										      hintText="Pun tekst inicijative"
										      floatingLabelText="Tekst inicijative"
										      fullWidth={true}
										      multiLine={true}
							      			  rows={6}
										    />
							              
										  
							              {this.renderStepActions(1)}

							            </StepContent>
							        </Step>
									
							        <Step>
							            <StepButton onTouchTap={() => this.setState({stepIndex: 2})}>
							              Dodajte trajanje i cilj
							            </StepButton>
							            <StepContent style={{marginLeft:"10px", paddingLeft:"10px"}}>

							            	<div className="row">
							            		<div className="col-md-6">
							            			<TimePicker
												     	format="24hr"
												     	hintText="Vreme zavrsetka inicijative"
												     	value={this.state.value24}
												     	onChange={this.handleTimePickerChange.bind(this)}
												     	name="value24"
												     	fullWidth={true}
												    />										        
											    </div>
											    <div className="col-md-6">
												    <DatePicker 
													    hintText="Datum zavrsetka inicijative" 
													    value={this.state.endDate}
													    onChange={this.handleDatePickerChange.bind(this)}
													    fullWidth={true}
												    />
											    </div>
											</div>


										    <TextField
										      onChange={this.handleChange.bind(this)}
										      value={this.state.targetNumber}
										      name="targetNumber"
										      hintText="Upisite potreban broj potpisa"
										      floatingLabelText="Potreban probj potpisa"
										      type="number"
										      fullWidth={true}
										    />

										     
							              {this.renderStepActions(2)}
							            </StepContent>
							         </Step>
							         <Step>
							            <StepButton onTouchTap={() => this.setState({stepIndex: 3})}>
							              Unesite lokaciju
							            </StepButton>
							            <StepContent style={{marginLeft:"10px", paddingLeft:"10px"}}>
							              <Map 
							              	center={(this.state.userLocation !== null) ? this.state.userLocation : position} 
							              	zoom={13} 
							              	style={{ height: 200 }}
							              	onCLick={this.handleMapClick.bind(this)}
							              	
							              	>
										    <TileLayer
										      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
										      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
										    />
										    <Marker 
										    	position={this.state.location} 
										    	icon={L.icon({ iconUrl: '/img/marker-icon.png', shadowUrl: '/img/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [0, -41] })}
												zIndexOffset={15}
										    >
										      <Popup>
										        <span>Lokacija inicijative.</span>
										      </Popup>
										    </Marker>
										  </Map>
										</StepContent>
							        </Step>

							
								    <RaisedButton
								      label="Kreirati"
								      primary={true}
								      onTouchTap={this.handleRequestCreate.bind(this)}
								    />
							    </Stepper>
			      			</div>	    
						</form>		
					</div>
				</div>		
				<div className="col-md-2">
				</div>			
			</div>
		</ReactCSSTransitionGroup>
		)
	}
}


			  /*  <TextField
			      onChange={this.handleChange.bind(this)}
			      value={this.state.text}
			      name="text"
			      hintText="Upisite tekst inicijative"
			      floatingLabelText="Tekst inicijative"
			      fullWidth={true}
			      multiLine={true}
      			  rows={5}
			    /> */

				
				//bug in package?
				/* <QuillEditor passedChange={this.passedChange.bind(this)} text={this.state.text}/> 
				 <QuillEditor passedChange={this.passedChange.bind(this)} text={this.state.text}/>
										   
										   <ReactQuill />
				
				
				*/


