import React, { Component }from "react";
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import logo from './logo.png'
import CharactersContainer from './container-components/characters-container/characters-container'
import CharacterContainer from './container-components/character-container/character-container'


const theme = createMuiTheme({
	palette: {
		type: 'dark',
	},
	typography: {
		fontFamily: 'Ropa Sans'
	},
});

const styles = theme => ({
	topLogo: {
		marginRight: 20
	},
	routeContainer:{
		margin: '65px 0'
	}
});


class App extends Component {
	render(){
		const { classes } = this.props;
		return (
			<Router>
				<MuiThemeProvider theme={theme}>
					<AppBar position="fixed" color="default">
						<Toolbar>
							<img className={ classes.topLogo } src={ logo } alt="Marvel Logo" width="150" height="50"/>
							<Button href="#flat-buttons" component={ Link } to="/">Characters</Button>
						</Toolbar>
					</AppBar>
					<div className={ classes.routeContainer }>
						<Route exact path="/" component={CharactersContainer}/>
						<Route path="/character/:characterId" component={CharacterContainer}/>
					</div>
				</MuiThemeProvider>
			</Router>
		);
	}

}


export default compose(
	withStyles(styles, { name: 'App' }),
	connect()
)(App);

