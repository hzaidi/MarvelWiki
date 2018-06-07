import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const NOCOLOR = '#909090';
const REDCOLOR = '#c35454';
const BLUECOLOR = '#7293d0';
const ORANGECOLOR = '#cba07b';


const styles = theme => ({
	container: {
		boxSizing: 'border-box',
		zIndex: 1
	},
	flexBox:{
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
});


const RatingPanel = (props) => {
	const { classes } = props;
	const onClickLove = () => {
		props.onLove(props.id);
	}
	const onClickLike = () => {
		props.onLike(props.id);
	}
	const onClickDislike = () => {
		props.onDislike(props.id);
	}

	const displayNames = (list) => {
		if(!list.length) { return null; }
		return list.map((l, i) => <div key={ i }>{ l.displayName }<br/></div>);
	}

	const iconType = ({ list, color = NOCOLOR, type }) => {
		let Component = type;
		return ( <Component style={{color: list.length > 0 ? color : NOCOLOR }} className={ classes.icons }/> )
	}

	const renderButton = ({ list, handler, color = NOCOLOR, type }) => {
		return (
			<IconButton onClick={ handler } className={ classes.buttons } aria-label="Love it">
				{ iconType({ list, color, type }) }
				<Typography variant="headline" noWrap={ true } style={{color: list.length > 0 ? color : NOCOLOR }}>
					{ list.length > 0 ? list.length : null }
				</Typography>
			</IconButton>
		);
	}

	const renderTooltipSection = ({ list, handler, color = NOCOLOR, type }) => {
		if(list.length > 0) {
			return (
				<Tooltip className={ classes.buttonContainer } enterDelay={300} title={ <div> { displayNames(list) } </div> } placement="bottom">
					{ renderButton({ list, handler, color, type}) }
				</Tooltip>
			)
		}else{
			return ( renderButton({ list, handler, color, type })  )
		}
	}

	return (
		<div className={ classes.container }>
			<Grid container spacing={8} direction="row">
				<Grid item xs={4} lg={4} md={4} className={ classes.flexBox }>
					{ renderTooltipSection({ list: props.loves, handler: onClickLove, color: REDCOLOR, type: FavoriteIcon }) }
				</Grid>
				<Grid item xs={4} lg={4} md={4} className={ classes.flexBox }>
					{ renderTooltipSection({ list: props.likes, handler: onClickLike, color: BLUECOLOR, type: ThumbUp }) }
				</Grid>
				<Grid item xs={4} lg={4} md={4} className={ classes.flexBox }>
					{ renderTooltipSection({ list: props.dislikes, handler: onClickDislike, color: ORANGECOLOR, type: ThumbDown }) }
				</Grid>
			</Grid>
		</div>
	)
}


RatingPanel.propTypes = {
	id: PropTypes.number.isRequired,
	likes: PropTypes.array.isRequired,
	loves: PropTypes.array.isRequired,
	dislikes: PropTypes.array.isRequired,
	onLove: PropTypes.func.isRequired,
	onLike: PropTypes.func.isRequired,
	onDislike: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(RatingPanel);