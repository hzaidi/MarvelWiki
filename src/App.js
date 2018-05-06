import React, { Component }from "react";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import AppBar from "material-ui/AppBar";
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Toolbar from "material-ui/Toolbar";
import logo from './logo.png'
import CharactersContainer from './container-components/characters-container/characters-container'



const theme = createMuiTheme({
	typography: {
		fontFamily: 'Ropa Sans',
	  	htmlFontSize: 10,
	},
});

const styles = theme => ({

});

class App extends Component {
	render(){
		return (
			<MuiThemeProvider theme={theme}>
				<AppBar position="static" color="default">
					<Toolbar>
						<img src={ logo } alt="Marvel Logo" width="150" height="50"/>
					</Toolbar>
				</AppBar>
				<CharactersContainer />
			</MuiThemeProvider>
		);
	}

}


export default compose(
	withStyles(styles, { name: 'App' }),
	connect()
)(App);

