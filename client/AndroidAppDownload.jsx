import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';


export default class Login extends Component {
  
  handleRequestLogin(){
  	event.preventDefault();
  	FlowRouter.go("/login");
  }
  
  render() {
    return (
		<div className="row">
			<div className="col-md-2">
			</div>
			<div className="col-md-8">
			
				<div style={{textAlign: "center", marginTop:"50px"}}>
					<h1 style={{color: "rgb(0, 188, 212)"}}>Preuzmite Android aplikaciju optimizovanu 
															za Vaš mobilni uređaj.</h1>
					<RaisedButton label="Preuzmi" primary={true} fullWidth={true} onTouchTap={() =>
						{location.href = "/app/egov.apk";}
					}/>
				</div>

				
				  <div className="row" style={{marginTop:"30px"}}>
					<div className="col-md-4">
						<img style={{width:"100%", border:"1px solid rgb(0, 188, 212)", 
									borderRadius:"5px"}} src="/img/android1.jpg"/>
					</div>
					<div className="col-md-4">
						<img style={{width:"100%", border:"1px solid rgb(0, 188, 212)", 
									borderRadius:"5px"}} src="/img/android2.jpg"/>
					</div>
					<div className="col-md-4">
						<img style={{width:"100%", border:"1px solid rgb(0, 188, 212)", 
									borderRadius:"5px"}} src="/img/android3.jpg"/>
					</div>
				  </div>
			
			</div>
			<div className="col-md-2">
			</div>
		</div>
    );
  }
}