import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
	container: {

	}
});


const {{ properCase name }} = (props) => {
	const { classes } = props;
	return (
		<div className={ classes.container }>

		</div>
	)
}


{{ properCase name }}.propTypes = {
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)({{ properCase name }});