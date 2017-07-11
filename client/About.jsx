import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class About extends Component {
  
  handleRequestLogin(){
  	event.preventDefault();
  	FlowRouter.go("/login");
  }
  
  render() {

  	let imgStyle={
  		width:"100%"
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
          	<div className="col-md-2">
          	</div>
          	<div className="col-md-8">
          		<img src="/img/about1.jpg" style={imgStyle}></img>
          		<div style={{textAlign:"center"}}>
          		<h1 style={{color:"rgb(0, 188, 212)"}}>O nama</h1>    
          		</div>  		
          		<p><i>
          		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
          		aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          		Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          		Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          		</i></p>
          		<img src="/img/about2.png" style={imgStyle}></img>
          		<p>
          		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
          		aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          		Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          		Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
          		aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          		Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          		Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          		</p>
          		 <div className="row">
    		      	<div className="col-md-6">
    		      		<img src="/img/about4.jpg" style={imgStyle}></img>
    		      	</div>
    		      	<div className="col-md-6">
    		      		<p>
    		      		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
    		      		aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
    		      		Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    		      		Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum

    		      		</p>
    		      	</div>
    		     </div>
    		    <p>
    		      		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
    		      		aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
    		      		Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    		      		Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
    		      		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
    		      		aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
    		      		Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    		      		Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
    		    </p>
    		    <img src="/img/about3.jpg" style={imgStyle}></img>
          	</div>
          	<div className="col-md-2">
          	</div>
          </div>
         </ReactCSSTransitionGroup>
    );
  }
}