import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

import CreateComment from '../comment/CreateComment';
import CommentsList from '../comment/CommentsList';

import SignersList from '../signers/SignersList';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

export default class InitiativeDetailsTabs extends Component {



constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };
  

  
  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Komentari" value={0} />
          <Tab label="Potpisi" value={1} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div style={{padding:"1%"}}>
            <CreateComment initiativeId={this.props.initiativeId} />

	      	<CommentsList initiativeId={this.props.initiativeId}/>
          </div>
          <div style={styles.slide}>
            <SignersList initiativeId={this.props.initiativeId}/>
          </div>
        </SwipeableViews>
      </div>
    );
  }


}