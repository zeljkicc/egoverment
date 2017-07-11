import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class CreateComment extends Component {

constructor(){
	super();

	this.state={
		text:""
	}


}

handleChange(event) {
	//console.log(event.target.value);
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


handleRequestCreate(event){
	event.preventDefault();
	//console.log(this.state);

	let comment = this.state;
	comment.date = new Date();
	comment.user = Meteor.userId();
	comment.initiative = this.props.initiativeId;
	comment.likes = 0;
	comment.dislikes = 0;

	if(Meteor.userId()){
			Meteor.call("createComment", comment, function(error){
				if(error){
					Bert.alert('Neuspesno postavljanje komentara. Pokusajte ponovo.',
					'danger', 'fixed-top', 'fa-frown-o');
				}
			});

	}
	else{
		Bert.alert('Morate se prvo ulogovati da biste postavili komentar.',
					'danger', 'fixed-top', 'fa-frown-o');
	}
}

render(){
	return(
		<div style={{marginBottom:"20px"}}>
			<form>

			    <TextField
			      onChange={this.handleChange.bind(this)}
			      value={this.state.text}
			      name="text"
			      hintText="Upisite tekst komentara"
			      floatingLabelText="Tekst komentara"
			      fullWidth={true}
			      multiLine={true}
      			  rows={2}
			    />
		
			    <RaisedButton
			      label="Postaviti"
			      primary={true}
			      onTouchTap={this.handleRequestCreate.bind(this)}
			    />
			</form>		
		</div>		
		)
	}
}