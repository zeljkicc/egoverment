import React from 'react';

import NavDrawer from './NavDrawer';


import {deepOrange500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



let containerStyle={
	//marginTop: "10px"
}

export const MainLayout = ({content}) => (
	<MuiThemeProvider>
	<div >
		
			

					<NavDrawer />
					
				

		<div className="container-fluid" style={containerStyle}>		

			{content}

		</div>
		</div>
			
	</MuiThemeProvider>
)