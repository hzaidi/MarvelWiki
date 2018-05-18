import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	container: {
		position: 'relative'
	},
	title:{
		position: 'absolute',
		width: '100%',
		top:0,
		background: '#000',
		opacity: 0.7,
		padding: '2% 5%',
		boxSizing: 'border-box'
	},
	card: {
		cursor: 'pointer'
	}
});

const default_width = '100%';
const default_height = '100%';
const default_image_size = 'portrait_incredible';
const default_variant = 'headline';
const default_color = 'default';

const CharacterTile = (props) => {
	const { classes } = props;
	const width = props.width ? props.width : default_width;
	const height = props.height ? props.height : default_height;
	const imageSize = props.imageSize ? props.imageSize : default_image_size;
	const variant = default_variant;
	const color = default_color;

	const onClickTile = () => {
		props.onClickCharacter(props.character.id);
	}
	return (
		<div className={ classes.container } >
			<div className={classes.card} onClick={ onClickTile }>
				<div className={ classes.title }>
					<Typography variant={ variant } noWrap={ true } color={ color }>
						{ props.character.name }
					</Typography>
				</div>
				<img
					width={ width }
					height={ height }
					className={ classes.img }
					src={ props.character.imageUrl(imageSize) }
					alt={ props.character.name }
				/>
			</div>
		</div>
	)
}


CharacterTile.propTypes = {
	onClickCharacter: PropTypes.func.isRequired,
	character: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(CharacterTile);