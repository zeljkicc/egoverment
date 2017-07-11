import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';


export default class Login extends Component {
  
  handleRequestLogin(){
  	event.preventDefault();
  	FlowRouter.go("/login");
  }
  
  render() {
    return (
      <FlatButton label="Login" style={{color:"white", marginTop:"6px"}} onTouchTap={this.handleRequestLogin.bind(this)}/>
    );
  }
}