import React, { Component }from "react";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Home from '@material-ui/icons/Home';
import PersonPin from '@material-ui/icons/PersonPin';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { login, logout, checkAuthentication } from './actions/userActions';
import logo from './logo.png';
import { UserContext } from './context/userContext';
import CharactersContainer from './container-components/characters-container/characters-container';
import CharacterContainer from './container-components/character-container/character-container';
import DashboardContainer from './container-components/dashboard-container/dashboard-container';
import LoginLogoutButton from './presentation-components/login-logout-button/login-logout-button';

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
	},
	icon:{
		marginRight: 10
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
			<UserContext.Provider value={userState}>
				<Router>
					<MuiThemeProvider theme={theme}>
						<AppBar position="fixed" color="default">
							<Toolbar>
								<img className={ classes.topLogo } src={ logo } alt="Marvel Logo" width="150" height="50"/>
								<Button href="#flat-buttons" component={ Link } to="/" variant="flat" size="small">
									<PersonPin className={classes.icon} />
									Characters List
								</Button>
								<UserContext.Consumer>
								{
									user => (
										<Button disabled={ !user.isAuthenticated } href="#flat-buttons" component={ Link } to="/dashboard" variant="flat" size="small">
											<Home className={classes.icon} />
											Dashboard
										</Button>
									)
								}
								</UserContext.Consumer>
								<div className={ classes.j2 }></div>
								<LoginLogoutButton login={ login } logout={ logout }/>
							</Toolbar>
						</AppBar>
						<div className={ classes.routeContainer }>
							<Route exact path="/" component={CharactersContainer}/>
							<Route exact path="/dashboard" component={DashboardContainer}/>
							<Route path="/character/:characterId" component={CharacterContainer}/>
						</div>
					</MuiThemeProvider>
				</Router>
			</UserContext.Provider>
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

