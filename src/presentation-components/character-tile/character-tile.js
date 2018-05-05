import React from 'react';
import classNames from 'classnames';
import Avatar from 'material-ui/Avatar';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = {
	row: {
	 	display: 'flex',
	  	justifyContent: 'center',
	},
	bigAvatar: {
		margin: 10,
	  	width: 60,
	  	height: 60,
	},
};


const CharacterTile = (props) => {
	const { classes } = props;
	return (
		<div>
			 <Avatar
				alt={ props.character.name }
				src={ props.character.imageUrl }
				className={ classes.bigAvatar }
			/>
		</div>
	)
}


CharacterTile.propTypes = {
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(CharacterTile);