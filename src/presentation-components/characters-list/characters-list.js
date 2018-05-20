import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CharacterTile from '../character-tile/character-tile';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
	container: {
	}
});



const CharactersList = (props) => {
	const { classes } = props;

	function renderContent() {
		if(props.characters.length) {
			return (
					<Grid container spacing={8} className={ classes.container }>
					{
						props.characters.map(character => {
							return <Grid key={ character.id } xs={6} sm={4} md={3} lg={2} item>
										<CharacterTile
											id={character.id}
											title={ character.name }
											imageUrl={ character.imageUrl }
											onClick={ props.onClickCharacter }/>
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