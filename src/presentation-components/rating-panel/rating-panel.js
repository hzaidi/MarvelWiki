import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
	container: {
		boxSizing: 'border-box',
		display: 'flex',
		justifyContent: 'center',
		background: '#000'
	},
	buttonContainer:{
		display: 'flex',
		justifyContent: 'center',
	},
	buttons: {
		flexGrow: 1,
		minWidth: 65
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
				<Button onClick={ onClickLove } className={ classes.buttons } color="secondary" aria-label="Love it">
					<FavoriteIcon />
				</Button>
			</Tooltip>
			<Tooltip className={ classes.buttonContainer } enterDelay={300} title={ <div> { displayNames(props.likes) } </div> } placement="bottom">
				<Button onClick={ onClickLike } className={ classes.buttons } color="primary" aria-label="Like it">
					<ThumbUp />
				</Button>
			</Tooltip>
			<Tooltip className={ classes.buttonContainer } enterDelay={300} title={ <div> { displayNames(props.dislikes) } </div> } placement="bottom">
				<Button onClick={ onClickDislike } className={ classes.buttons } aria-label="Don't like it">
					<ThumbDown />
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