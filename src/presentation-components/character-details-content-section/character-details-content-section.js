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
	const { classes, fetching, resourceData , resourceTypeString, metaRecord} = props;
	return (
		<div className={ classes.container }>
			{
				<CharacterResourceTypeDetails
					resourceTypeString={ resourceTypeString }
					resourceTypeData={ resourceData }
					fetching={ fetching }
					metaRecord={ metaRecord }/>
			}
		</div>
	)
}


CharacterDetailsContentSection.propTypes = {
	fetching: PropTypes.bool.isRequired,
	metaRecord: PropTypes.object.isRequired,
	resourceData: PropTypes.array.isRequired,
	resourceTypeString: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(CharacterDetailsContentSection);