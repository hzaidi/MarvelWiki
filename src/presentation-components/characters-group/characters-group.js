import React 					from 'react';
import PropTypes 				from 'prop-types';
import { withStyles } 			from '@material-ui/core/styles';
import Button 					from '@material-ui/core/Button';
import AddIcon 					from '@material-ui/icons/Add';


const styles = theme => ({
	container: {

	},
	flexContainer:{
		boxSizing: 'border-box',   
		display: 'flex',
		justifyContent: 'center'
	},
	flexItem:{
		margin: 5,
		borderRadius: 10,
		flexGrow: 1,
		border: '2px dotted grey',
		width: 150,
		height: 200,
		display: 'flex',
		justifyContent: 'center',
	},
	button: {
		alignSelf: 'center',
		margin: theme.spacing.unit,
	},
});


const CharactersGroup = (props) => {
	const { classes, add } = props;

	const cols = 3;
	const rows = 2


	return (
		<div className={ classes.container }>
			{[...Array(rows)].map((x, row) =>
				<div className={ classes.flexContainer } key={ row }>
				{[...Array(cols)].map((x, col) =>
					<div className={ classes.flexItem } key={ col }>
						<Button onClick={ add } variant="fab" color="primary" aria-label="add" className={classes.button}>
							<AddIcon />
						</Button>
					</div>
				)}
				</div>
			)}
		</div>
	)
}


CharactersGroup.propTypes = {
	classes: PropTypes.object.isRequired,
	add: PropTypes.func.isRequired
  };

  export default withStyles(styles)(CharactersGroup);