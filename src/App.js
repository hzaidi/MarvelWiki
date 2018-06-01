import React, { Component }from "react";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Face from '@material-ui/icons/Face';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { login, logout, checkAuthentication } from './actions/userActions';
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
	},
	j2:{
		flex: '1 1 auto'
	}
});


class App extends Component {
	componentDidMount(){
		const { checkAuthentication } = this.props;
		checkAuthentication();
	}
	render(){
		const { classes, userState, login, logout } = this.props;
		return (
			<Router>
				<MuiThemeProvider theme={theme}>
					<AppBar position="fixed" color="default">
						<Toolbar>
							<img className={ classes.topLogo } src={ logo } alt="Marvel Logo" width="150" height="50"/>
							<div className={ classes.j2 }></div>
							<div>
								{
									userState.isAuthenticated ?
										<Button onClick={ logout } className={classes.button} variant="flat" size="small">
											<AccountCircle />
											{ userState.user.displayName }
										</Button>
										:
										<Button onClick={ login } className={classes.button} variant="flat" size="small">
											<Face />
											Login
										</Button>
								}
							</div>
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

const mapStateToProps = (state, props) => {
	const { userState } = state;
	return {
		userState
	}
}
const mapActionsToProp = {
	login,
	logout,
	checkAuthentication
}

export default compose(
	withStyles(styles, { name: 'App' }),
	connect(mapStateToProps, mapActionsToProp)
)(App);

