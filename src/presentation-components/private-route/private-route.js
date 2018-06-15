import React 				from 'react';
import PropTypes 			from 'prop-types';
import { withStyles } 		from '@material-ui/core/styles';
import { Route } from 'react-router-dom'
import { UserContext } 		from '../../context/userContext';

const styles = theme => ({
	container: {

	}
});


const PrivateRoute = ({ component: Component, ...rest }) => (
	<UserContext.Consumer>
	{
		user => (
			<Route
			{...rest}
			render={props =>
				user.isAuthenticated ? (
				<Component {...props} />
				) : null
			}
			/>
		)
	}
	</UserContext.Consumer>
);



PrivateRoute.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrivateRoute);