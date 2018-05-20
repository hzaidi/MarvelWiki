import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
	container: {
		position: 'relative',
		transition: '0.70s'
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
		cursor: 'pointer',
		transition: '0.70s',
		'&:hover':{
			transition: '0.70s',
			transform: 'rotateY(1deg) rotateZ(1deg)'
		}
	},
	buttonWrapper:{
		padding:0
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
		props.onClick(props.id);
	}
	return (
		<Button className={ classes.buttonWrapper }>
			<div className={ classes.container } >
				<div className={classes.card} onClick={ onClickTile }>
					{	props.title && props.title.length > 0 &&
						<div className={ classes.title } title={ props.title }>
							<Typography variant={ variant } noWrap={ true } color={ color }>
								{ props.title }
							</Typography>
						</div>
					}
					<img
						width={ width }
						height={ height }
						className={ classes.img }
						src={ props.imageUrl(imageSize) }
						alt={ props.title }
					/>
				</div>
			</div>
		</Button>
	)
}


CharacterTile.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	imageUrl: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(CharacterTile);