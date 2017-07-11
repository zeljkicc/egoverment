import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import Paper from 'material-ui/Paper';

import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

const colors = [
  'Red',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Purple',
  'Black',
  'White',
];

/**
 * `AutoComplete` search text can be implemented as a controlled value,
 * where `searchText` is handled by state in the parent component.
 * That value is reseted with the `onNewRequest` callback.
 */
export default class SearchBar extends Component {
  constructor(){
    super(); 

    this.state = {
      searchText: '',
    };
  }
  

  handleUpdateInput = (searchText) => {
    this.setState({
      searchText: searchText,
    });

    InitiativeSearch.search(searchText);

  };

  handleNewRequest = (text) => {
    //alert(text);
    //console.log(text);

    //InitiativeSearch.search(text);

    /*this.setState({
      searchText: '',
    });*/


    FlowRouter.go('/initiativeslist/search/' + text);
	
	this.handleTouchTapBack();

  };

  searchSource(){
    return InitiativeSearch.getData({});
  }

  handleTouchTapBack(){
  	this.props.handleBackClick();
  }

  initiatives(){
    return Initiatives.find().fetch();
  }

  render() {

    let items = this.searchSource().map((item, i) => {
      return item.name;
    });
    return (
    <Paper 
    	zDepth={2} 
    	children={
    		<Toolbar style={{height:"64px", backgroundColor:"white"}}>
	        <ToolbarGroup >
	          	<ArrowBack onTouchTap={this.handleTouchTapBack.bind(this)} style={{cursor:"pointer"}}/>
	        </ToolbarGroup>
	        <ToolbarGroup style={{width:"80%", margin:"auto"}} className="removeUnderline">
	          	<AutoComplete
	          	  fullWidth={true}
		          hintText="Pretrazite inicijative"
		          searchText={this.state.searchText}
		          onUpdateInput={this.handleUpdateInput}
		          onNewRequest={this.handleNewRequest}
		          dataSource={items}
		          filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
		          openOnFocus={true}
		          disableFocusRipple={true}
		         
		         />
	        </ToolbarGroup>
	      </Toolbar>
    	}

    />    


    );
  }
}