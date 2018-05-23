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
	const { classes, resourceData, resourceTypeString } = props;
	return (
		<div className={ classes.container }>
			{
				<CharacterResourceTypeDetails
					resourceTypeString={ resourceTypeString }
					resourceTypeData={ resourceData }
					/>
			}
		</div>
	)
}


CharacterDetailsContentSection.propTypes = {
	resourceData: PropTypes.object.isRequired,
	resourceTypeString: PropTypes.string,
	classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(CharacterDetailsContentSection);