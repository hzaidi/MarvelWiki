import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Tooltip from '@material-ui/core/Tooltip';

const NOCOLOR = '#909090';
const REDCOLOR = '#c35454';
const BLUECOLOR = '#7293d0';
const ORANGECOLOR = '#cba07b';


const styles = theme => ({
	container: {
		boxSizing: 'border-box',
		display: 'flex',
		justifyContent: 'center',
		zIndex: 1
	},
	buttonContainer:{
		display: 'flex',
		justifyContent: 'center',
	},
	buttons: {
		flexGrow: 1,
		minWidth: 65
	},
	icons:{
		marginRight: 10
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
		if(!list.length) { return '...'; }
		return list.map((l, i) => <div key={ i }>{ l.displayName }<br/></div>);
	}
	return (
		<div className={ classes.container }>
			<Tooltip className={ classes.buttonContainer } enterDelay={300} title={ <div> { displayNames(props.loves) } </div> } placement="bottom">
				<Button onClick={ onClickLove } className={ classes.buttons } aria-label="Love it">
					<FavoriteIcon style={{color: props.loves.length > 0 ? REDCOLOR : NOCOLOR }} className={ classes.icons } /> { props.loves.length > 0 ? props.loves.length : null }
				</Button>
			</Tooltip>
			<Tooltip className={ classes.buttonContainer } enterDelay={300} title={ <div> { displayNames(props.likes) } </div> } placement="bottom">
				<Button onClick={ onClickLike } className={ classes.buttons } aria-label="Like it">
					<ThumbUp style={{color:  props.likes.length > 0 ? BLUECOLOR : NOCOLOR }} className={ classes.icons } /> { props.likes.length > 0 ? props.likes.length : null }
				</Button>
			</Tooltip>
			<Tooltip className={ classes.buttonContainer } enterDelay={300} title={ <div> { displayNames(props.dislikes) } </div> } placement="bottom">
				<Button onClick={ onClickDislike } className={ classes.buttons } aria-label="Don't like it">
					<ThumbDown style={{color: props.dislikes.length > 0 ? ORANGECOLOR : NOCOLOR }} className={ classes.icons } /> { props.dislikes.length > 0 ? props.dislikes.length : null }
				</Button>
			</Tooltip>
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