import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Face from '@material-ui/icons/Face';
import { UserContext } from '../../context/userContext';

const styles = theme => ({
	container: {

	},
	icon:{
		marginRight: 10
	}
});


const LoginLogoutButton = (props) => {
	const { classes, login, logout } = props;
	return (
		<div className={ classes.container }>
			<UserContext.Consumer>
				{
					user => (
						<div>
							{
							user.isAuthenticated ?
								<Button onClick={ logout } variant="flat" size="small">
									<AccountCircle className={classes.icon} />
									{ user.user.displayName }
								</Button>
								:
								<Button onClick={ login } variant="flat" size="small">
									<Face className={classes.icon} />
									Login
								</Button>
							}
						</div>
					)
				}
			</UserContext.Consumer>
		</div>
	)
}


LoginLogoutButton.propTypes = {
	classes: PropTypes.object.isRequired,
	login: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired
};

export default withStyles(styles)(LoginLogoutButton);