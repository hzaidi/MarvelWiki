import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from "material-ui/Typography";
import CharacterTile from '../character-tile/character-tile';
import Grid from 'material-ui/Grid';

const styles = theme => ({
	container: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center'
	}
});



const CharactersList = (props) => {
	const { classes } = props;

	function renderContent() {
		if(props.characters.length) {
			return (
					<Grid container spacing={0} className={ classes.container }>
					{
						props.characters.map(character => {
							return <Grid  key={ character.id } item>
										<CharacterTile character={ character } onClickCharacter={ props.onClickCharacter }/>
									</Grid>
						})
					}
					</Grid>
				)
		}else {
			return (
				<Typography variant="caption">
					Unable to find any result.
				</Typography>
			)
		}
	}

	return (
		<div className={classes.container}>
			{ renderContent() }
		</div>
	)
}


CharactersList.propTypes = {
	onClickCharacter: PropTypes.func.isRequired,
	characters: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(CharactersList);