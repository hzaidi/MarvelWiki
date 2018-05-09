import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from "material-ui/Typography";
import CharacterTile from '../character-tile/character-tile';


const styles = theme => ({
	root: {
		flexGrow: 1,
		height: 'calc(100vh - 64px)'
	},
	gridContainer:{
		height: '100%'
	},
	rightPanel: {
		boxSizing: 'border-box',
		padding: theme.spacing.unit * 2,
		height: '100%',
		borderLeft: `1px solid #707070`
	},
	description: {
		boxSizing: 'border-box',
		padding: theme.spacing.unit * 2
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
			<Grid className={ classes.gridContainer } container spacing={0}>
				<Grid item xs={ 5 }>
					<div>
						<Grid item xs={12}>
							<CharacterTile
								character={ character }
								imageSize={ 'landscape_medium' }
								onClickCharacter={ ()=> {} }/>
						</Grid>
						<Grid item xs={12}>
							<Typography className={ classes.description } variant="subheading" color="textSecondary">
								"{ character.description }"
							</Typography>
						</Grid>
					</div>
				</Grid>
				<Grid item xs>
					<div className={classes.rightPanel}>Some Random Content</div>
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