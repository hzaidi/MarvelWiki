import React 					from 'react';
import PropTypes 				from 'prop-types';
import { withStyles } 			from '@material-ui/core/styles';
import Button 					from '@material-ui/core/Button';
import AddIcon 					from '@material-ui/icons/Add';
import IconButton 				from '@material-ui/core/IconButton';
import RemoveCircle 			from '@material-ui/icons/RemoveCircle';
import ImageTile 				from '../image-tile/image-tile';

const height = 180;
const width = 140;

const styles = theme => ({
	container: {

	},
	flexContainer:{
		boxSizing: 'border-box',   
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap'
	},
	flexItem:{
		position: 'relative',
		margin: 5,
		border: '2px dotted grey',
		width,
		height,
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	button: {
		alignSelf: 'center',
		margin: theme.spacing.unit,
	},
	removeButton:{
		position: 'absolute',
		top: -25,
		right: -25
	}
});


const CharactersGroup = (props) => {
	const { classes, selectedCharacters } = props;

	const cols = 3;
	const tiles = 6 - selectedCharacters.length;

	const onTileClick = (tileNumber) => {
		props.openModal(tileNumber);
	}

	const onRemoveCharacter = (character) => {
		props.removeCharacter(character);
	}

	return (
		<div className={ classes.container }>
			<div className={ classes.flexContainer }>
			{
				selectedCharacters.map(character => {
					return <div className={ classes.flexItem } key={ character.id }>
								<ImageTile
									className={ classes.tile }
									id={character.id}
									width={ width }
									height={ height }
									title={ character.name }
									animateOnHover={ false }
									imageUrl={ `${character.thumbnail.path}.${character.thumbnail.extension}` }
									onClick={ () => {} }
								/>
								<IconButton onClick={ () => onRemoveCharacter(character) } color="secondary" className={classes.removeButton}>
									<RemoveCircle />
								</IconButton>
							</div>
				})
			}

			{[...Array(tiles)].map((x, tileNumber) =>
				<div className={ classes.flexItem } key={ tileNumber }>
					{ (tileNumber == 0) && <Button onClick={ () => { onTileClick(tileNumber) } } variant="fab" color="primary" aria-label="add" className={classes.button}>
						<AddIcon />
					</Button> }
				</div>
			)}
			</div>
		</div>
	)
}


CharactersGroup.propTypes = {
	classes: PropTypes.object.isRequired,
	openModal: PropTypes.func.isRequired,
	selectedCharacters: PropTypes.array.isRequired,
	removeCharacter: PropTypes.func.isRequired
  };

  export default withStyles(styles)(CharactersGroup);