import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import InitiativesList from './initiative/InitiativesList';

import TextField from 'material-ui/TextField';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Contact extends Component {
	sendMessage(){
        		Bert.alert('Uspesno poslata poruka!',
					'success', 'fixed-top', 'fa-check');
					
				}
	
  
  render() {

    return (
      <ReactCSSTransitionGroup
          transitionName="route"
          transitionEnterTimeout={600}
          transitionAppearTimeout={600}
          transitionLeaveTimeout={400}
          transitionAppear={true}
          >
          <div className="row" style={{textAlign:"justify"}}>
          	<div className="col-md-2">
          	</div>
          	<div className="col-md-8">
                      <div style={{marginRight:"5px", marginLeft:"5px"}}>
                            <h1 style={{color:"rgb(0, 188, 212)"}}>Kontaktirajte nas</h1>
                            <hr/>
                      </div>
                
                      <form>
                          <div className="row">
                            <div className="col-md-6">
                              <TextField
                                name="name"
                                hintText="Vaše ime"
                                floatingLabelText="Vaše ime"
                                fullWidth={true}
                              />
                            </div>
                            <div className="col-md-6">
                              <TextField
                                name="email"
                                hintText="Vaš email"
                                floatingLabelText="Vaš email"
                                fullWidth={true}
                              />
                            </div>
                          </div>

                          <TextField
                                name="message"
                                hintText="Vaša poruka"
                                floatingLabelText="Vaša poruka"
                                fullWidth={true}
                                multiLine={true}
                                rows={4}
                              />
                          
                          <RaisedButton label={"Posalji"} primary={true} onTouchTap={this.sendMessage.bind(this)}/>
                          
                    </form>
          		        

                       

          	</div>
          	<div className="col-md-2">
          	</div>
          </div>
      </ReactCSSTransitionGroup>
    );
  }
}