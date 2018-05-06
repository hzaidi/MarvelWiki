import React from 'react';
import Avatar from 'material-ui/Avatar';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from "material-ui/Typography";
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

const styles = theme => ({
	container: {
		maxWidth: '216px;'
	}
});


const CharacterTile = (props) => {
	const { classes } = props;
	return (
		<div className={ classes.container }>
			<Typography variant="caption" noWrap={ true } color="primary">
				{ props.character.name }
			</Typography>
			<img src={ props.character.imageUrl('portrait_incredible') } alt={ props.character.name }/>
		</div>
	)
}


CharacterTile.propTypes = {
	character: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(CharacterTile);