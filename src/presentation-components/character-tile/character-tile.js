import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from "material-ui/Typography";

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
		padding: '5%',
		boxSizing: 'border-box'
	},
	card: {
		cursor: 'pointer'
	}
});

const DEFAULT_WIDTH = '100%';
const DEFAULT_HEIGHT = '100%';
const DEFAULT_IMAGE_SIZE = 'portrait_incredible';
const DEFAULT_VARIANT = 'headline';
const DEFAULT_COLOR = 'default';

const CharacterTile = (props) => {
	const { classes } = props;
	const width = props.width ? props.width : DEFAULT_WIDTH;
	const height = props.height ? props.height : DEFAULT_HEIGHT;
	const imageSize = props.imageSize ? props.imageSize : DEFAULT_IMAGE_SIZE;
	const variant = DEFAULT_VARIANT;
	const color = DEFAULT_COLOR;

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