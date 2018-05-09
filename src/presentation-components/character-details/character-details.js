import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import CharacterTile from '../character-tile/character-tile';


const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	rightPanel: {
		boxSizing: 'border-box',
		padding: theme.spacing.unit * 2,
		height: '100%'
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
});


const CharacterDetails = (props) => {
	const { classes, character } = props;
	return (
		<div className={ classes.root }>
			<Grid container spacing={0}>
				<Grid item xs={ 5 }>
					<div>
						<Grid item xs={12}>
							<CharacterTile
								character={ character }
								imageSize={ 'landscape_medium' }
								onClickCharacter={ ()=> {} }/>
						</Grid>
						<Grid item xs={12}>
							<Paper className={classes.paper}>Some Random Content</Paper>
						</Grid>
					</div>
				</Grid>
				<Grid item xs>
					<Paper className={classes.rightPanel}>Some Random Content</Paper>
				</Grid>
			</Grid>

		</div>
	)
}


CharacterDetails.propTypes = {
	character: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(CharacterDetails);