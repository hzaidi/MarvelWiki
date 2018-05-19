import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CharacterResourceTypeDetails from '../character-resource-type-details/character-resource-type-details'

const styles = theme => ({
	container: {

	}
});


const CharacterDetailsContentSection = (props) => {
	const { classes, character } = props;
	return (
		<div className={ classes.container }>
			{ 	character.comics.items.length > 0 &&
					<CharacterResourceTypeDetails resourceTypeString="Comics" resourceTypeData={ character.comics }/>
			}
			{	character.events.items.length > 0 &&
					<CharacterResourceTypeDetails resourceTypeString="Events" resourceTypeData={ character.events }/>
			}
			{	character.series.items.length > 0 &&
					<CharacterResourceTypeDetails resourceTypeString="Series" resourceTypeData={ character.series }/>
			}
			{	character.stories.items.length > 0 &&
					<CharacterResourceTypeDetails resourceTypeString="Stories" resourceTypeData={ character.stories }/>
			}
		</div>
	)
}


CharacterDetailsContentSection.propTypes = {
	character: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(CharacterDetailsContentSection);