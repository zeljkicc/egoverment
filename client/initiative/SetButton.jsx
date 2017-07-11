import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';




export default class SetButton extends Component {

	constructor(props){
		super(props);

		this.state = {
			clicked: this.props.clicked
		}
	}

  handleTouchTap(){
  	event.preventDefault();
  	this.setState({
  		clicked: !this.props.clicked
  	})
  }


  
  render() {

  let buttonStyle = {
			marginBottom:"10px"
		}

let button = this.state.clicked ? 
			 <RaisedButton label={this.props.label1} fullWidth={true} style={buttonStyle} primary={true}/> :
			  <RaisedButton label={this.props.label2} fullWidth={true} style={buttonStyle} secondary={true}/>;	
			  
    return (
     	{button}
    );
  }
}