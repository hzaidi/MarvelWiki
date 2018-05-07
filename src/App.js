import React, { Component }from "react";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import AppBar from "material-ui/AppBar";
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Toolbar from "material-ui/Toolbar";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import logo from './logo.png'
import CharactersContainer from './container-components/characters-container/characters-container'
import CharacterContainer from './container-components/character-container/character-container'


const theme = createMuiTheme({
	palette: {
		type: 'dark',
	},
	typography: {
		fontFamily: 'Ropa Sans',
	  	htmlFontSize: 10,
	},
});

const styles = theme => ({
	topLogo: {
		marginRight: 20
	}
});


class App extends Component {
	render(){
		const { classes } = this.props;
		return (
			<Router>
				<MuiThemeProvider theme={theme}>
					<AppBar position="static" color="default">
						<Toolbar>
							<img className={ classes.topLogo } src={ logo } alt="Marvel Logo" width="150" height="50"/>
							<Button href="#flat-buttons" component={ Link } to="/">Characters</Button>
							<Button href="#flat-buttons" component={ Link } to="/about">Creators</Button>
						</Toolbar>
					</AppBar>
					<Route exact path="/" component={CharactersContainer}/>
					<Route path="/character/:characterId" component={CharacterContainer}/>
				</MuiThemeProvider>
			</Router>
		);
	}

}


export default compose(
	withStyles(styles, { name: 'App' }),
	connect()
)(App);

