import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CharacterResourceTypeDetails from '../character-resource-type-details/character-resource-type-details'

const styles = theme => ({
	container: {
		width: '90%',
		display: 'flex',
		margin: '0 auto'
	},

});


const CharacterDetailsContentSection = (props) => {
	const populateResourceTypes = (character) => {
		let resourceType = [];
		if(character.comics.items.length) { resourceType.push({typeName: 'Comics' }) }
		if(character.events.items.length) { resourceType.push({typeName: 'Events' }) }
		if(character.series.items.length) { resourceType.push({typeName: 'Series' }) }
		if(character.stories.items.length) { resourceType.push({typeName: 'Stories' }) }
		return resourceType;
	}
	const { classes, character, fetching, resourceData , tabValue, metaRecord} = props;
	let resourceTypes = populateResourceTypes(character)
	return (
		<div className={ classes.container }>
			{
				resourceTypes.map((rt, idx) => {
					return tabValue === idx && <CharacterResourceTypeDetails
								key={ idx }
								resourceTypeString={ rt.typeName }
								resourceTypeData={ resourceData }
								fetching={ fetching }
								metaRecord={ metaRecord }/>
				})
			}
		</div>
	)
}


CharacterDetailsContentSection.propTypes = {
	fetching: PropTypes.bool.isRequired,
	metaRecord: PropTypes.object.isRequired,
	tabValue: PropTypes.number.isRequired,
	resourceData: PropTypes.array.isRequired,
	character: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(CharacterDetailsContentSection);