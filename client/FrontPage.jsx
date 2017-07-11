import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import InitiativesList from './initiative/InitiativesList';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class FrontPage extends TrackerReact(Component) {
  
  handleRequestLogin(){
  	event.preventDefault();
  	FlowRouter.go("/login");
  }

     handleTouchTap(event){
      event.preventDefault();

      FlowRouter.go("/initiativeslist");
    }
  
  render() {

  	let imgStyle={
  		width:"100%"
  	}

    const style = {
      margin: 12,
    };
    
    let buttonStyle = {
        marginBottom: "3px"
    }



    return (
      <ReactCSSTransitionGroup
          transitionName="route"
          transitionEnterTimeout={600}
          transitionAppearTimeout={600}
          transitionLeaveTimeout={400}
          transitionAppear={true}
          >
          <div className="row" style={{textAlign:"justify", marginTop:"10px"}}>
          	<div className="col-md-7">
          		<img src="/img/about1.jpg" style={imgStyle}></img>
          		<div style={{textAlign:"center"}}>
          		  <h1 style={{color:"rgb(0, 188, 212)"}}>Portal građanske inicijative</h1>    
          		</div>  		
          		<p>
                    <blockquote>
                        <i>
                            "E-Uprava (E-Government) je skraćenica nastala od elektronska uprava, mada se neki put upotrebljavaju izrazi kao digitalna uprava, on-lajn ili internet uprava. Sam pojam se odnosi u širem smislu na olakšavanje procesa informacije, komunikacije i transakcije između i unutar državnih institucija. E-Uprava istovremeno pokriva olakšavanje procesa informacije, komunikacije i transakcije između državnih institucija, građana i preduzeća.
                            <br/>
                            Da bi se olakšao taj proces interakcije misli se pre svega na korišćenje elektronskih informacijskih i komunikacijskih tehnologija. Proces informacije se definiše kao jednosmerno dobijanje informativnih podataka. O komunikaciji se govori kada postoji dvosmerna razmena informacija. Transakcija je prenos objekta ili prava između dva u komunikacionom procesu participirajuća subjekta.                            
                            <h4 style={{marginTop:"0px", marginBottom:"0px"}}>Građani mogu lakše učestvovati u izražavanju svoje volje. To dovodi do učvršćivanja demokratije."</h4>
                            <br/>                             
                        </i>
                    </blockquote>                            
                </p>
                <p style={{textAlign:"center"}}>
                    <h3 style={{color:"rgb(0, 188, 212)"}}>
                        Portal omogućava podržavanje inicijativa, kreiranje novih, postavljanje komentara...
                    </h3>                    
                </p>
                <div className="row">
                    {
                        (!Meteor.userId())
                            ?
                                <div>
                                    <div className="col-md-4">
                                        <RaisedButton label="Prikazi listu" primary={true} fullWidth={true} onTouchTap={()=>FlowRouter.go("/initiativeslist")} style={buttonStyle}/>
                                    </div>  
                                    <div className="col-md-4">
                                        <RaisedButton label="Registracija" primary={true} fullWidth={true} onTouchTap={()=>FlowRouter.go("/register")} style={buttonStyle}/>
                                    </div>
                                    <div className="col-md-4">
                                        <RaisedButton label="Uloguj me" primary={true} fullWidth={true} onTouchTap={()=>FlowRouter.go("/login")} style={buttonStyle}/>
                                    </div>   
                                </div>
                            :
                                <div>
                                    <div className="col-md-6">
                                        <RaisedButton label="Prikazi listu" primary={true} fullWidth={true} onTouchTap={()=>FlowRouter.go("/initiativeslist")} style={buttonStyle}/>
                                    </div>  
                                    <div className="col-md-6">
                                        <RaisedButton label="Kreiraj novu inicijativu" primary={true} fullWidth={true} onTouchTap={()=>FlowRouter.go("/createinitiative")} style={buttonStyle}/>
                                    </div>
                                </div>
                    }
                                         
                </div>
              <hr/>
          	</div>
          	<div className="col-md-5">
                <div style={{textAlign:"center"}}>
                    <h1 style={{color:"rgb(0, 188, 212)"}}>Aktuelne inicijative</h1> 
                </div>
          		<InitiativesList front={true}/>
                <div style={{textAlign:"center"}}>
                    <FlatButton label="Videti još..." primary={true} style={style} onTouchTap={this.handleTouchTap.bind(this)}/>
                </div>
          	</div>
          </div>
      </ReactCSSTransitionGroup>
    );
  }
}