import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import Toggle from 'material-ui/Toggle';


export default class InitiativeListAdmin extends Component {
	constructor(props){
		super(props);

    this.state = {
      checked: this.props.initiative.front
    }

	}

  handleDetailsClick(event){
    event.preventDefault();

    FlowRouter.go("/initiativeslist/" + this.props.initiative._id);
  }

  handleDeleteClick(event){
    event.preventDefault();

    Meteor.call("deleteInitiative", this.props.initiative._id, 
      function(error){
        if(error){
          Bert.alert('Greska prilikom brisanja inicijative. Pokusajte ponovo.',
          'danger', 'fixed-top', 'fa-frown-o');
        }
        else{
        Bert.alert('Uspesno obrisana inicijativa.',
          'success', 'fixed-top', 'fa-check');
        }
      });
  }

  handleToggle(event){
    event.preventDefault();

    Meteor.call("toggleFrontInitiative", {id: this.props.initiative._id, value: !this.state.checked},
      function(error){
        if(error){
          Bert.alert('Neuspelo ažuriranje inicijative. Pokusajte ponovo.',
          'danger', 'fixed-top', 'fa-frown-o');
        }
        else{
        Bert.alert('Uspesno ažurirana inicijativa.',
          'success', 'fixed-top', 'fa-check');
        }
      });

    this.setState({
      checked: !this.state.checked
    })

    
  }

  checked(){
    return this.state.checked;
  }

  
  render() {

    const style = {
      margin: 12,
    };

    let beginTime = moment(this.props.initiative.date).locale("sr").format('LLLL');
    let endTime = moment(this.props.initiative.endDate).locale("sr").format('LLLL');



    return (
        <TableRow>
            <TableRowColumn>{this.props.i + 1}.</TableRowColumn>
            <TableRowColumn>{this.props.initiative.name}</TableRowColumn>
            <TableRowColumn>{beginTime}</TableRowColumn>
            <TableRowColumn>{endTime}</TableRowColumn>
            <TableRowColumn>
               <Toggle
                  toggled={this.checked()}
                  style={{marginBottom: "16px"}}
                  onToggle={this.handleToggle.bind(this)}
                />
            </TableRowColumn>
            <TableRowColumn>
              <div>
                
                <RaisedButton label="Delete" style={style} secondary={true} onTouchTap={this.handleDeleteClick.bind(this)}/>
              </div>
            </TableRowColumn>
            <TableRowColumn>
              <RaisedButton label="Details" style={style} primary={true} onTouchTap={this.handleDetailsClick.bind(this)}/>
            </TableRowColumn>
        </TableRow>
    );
  }
}