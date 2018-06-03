import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';

const styles = theme => ({
	container: {
		position: 'relative',
		transition: '0.70s',
		width: '100%'
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
	footer: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		boxSizing: 'border-box'
	},
	card: {
		cursor: 'pointer',
		transition: '0.40s',
		'&:hover':{
			transition: '0.40s',
			transform: 'rotateY(1deg) rotateZ(1deg) scale(1.03)'
		}
	},
	buttonWrapper:{
		padding:0,
		width: '100%'
	}
});

const default_width = '100%';
const default_height = '100%';
const default_variant = 'headline';
const default_color = 'default';
const defualt_noWrap = true;

const ImageTile = (props) => {
	const { classes } = props;
	const width = props.width ? props.width : default_width;
	const height = props.height ? props.height : default_height;
	const imageSize = props.imageSize === undefined ? null : props.imageSize;
	const variant = props.variant ? props.variant : default_variant;
	const color = props.color ? props.color : default_color;
	const noWrap = props.noWrap === undefined ? defualt_noWrap : props.noWrap;
	const animateOnHover = props.animateOnHover === undefined ? true : props.animateOnHover;
	const footer = props.footer === undefined ? null : props.footer;
	const onClickTile = () => {
		props.onClick(props.id);
	}
	return (

			<Fade in={ props.imageUrl != null } style={{ transformOrigin: '0 0 0' }}>
				<div className={ classes.container } >
					<div className={ animateOnHover ? classes.card : {} }>
						<Button className={ classes.buttonWrapper } onClick={ onClickTile }>
						{	props.title && props.title.length > 0 &&
							<div className={ classes.title } title={ props.title }>
								<Typography variant={ variant } noWrap={ noWrap } color={ color }>
									{ props.title }
								</Typography>
							</div>
						}
						<img
							width={ width }
							height={ height }
							className={ classes.img }
							src={ typeof props.imageUrl === 'string' ? props.imageUrl : props.imageUrl(imageSize) }
							alt={ props.title }
						/>
						</Button>
						{
							footer &&
							<footer className={ classes.footer }>
								{ props.footer }
							</footer>
						}
					</div>
				</div>
			</Fade>

	)
}


ImageTile.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string,
	footer: PropTypes.element,
	variant: PropTypes.string,
	noWrap: PropTypes.bool,
	imageSize: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	imageUrl: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]),
	classes: PropTypes.object.isRequired,
	animateOnHover: PropTypes.bool
  };

  export default withStyles(styles)(ImageTile);