import React, { Component }from "react";
import AppBar from "material-ui/AppBar";
import Typography from "material-ui/Typography";
import Toolbar from "material-ui/Toolbar";
import { connect } from 'react-redux';
import CharactersContainer from './container-components/characters-container/characters-container'

class App extends Component {
	render(){
		return (
			<div>
				<AppBar position="static" color="default">
					<Toolbar>
					<Typography variant="title" color="inherit">
						Title
					</Typography>
					</Toolbar>
				</AppBar>
				<CharactersContainer />
			</div>
		);
	}

}


export default connect()(App);
