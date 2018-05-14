import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
	container: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center'
	},
	tiles: {
		display: 'flex',
		justifyContent: 'center',
		margin: '1px',
		background: '#2d2d2d',
		width: '216px',
		height: '324px;',
		opacity: 0.8
	},
	progress: {
		alignSelf: 'center',
		margin: theme.spacing.unit * 2,
  	}
});


const CharactersLoading = (props) => {
	const { classes } = props;
	const generateTiles = () => {
		return Array.from({length: 10}).map((x, i) => i);
	}
	return (
		<div className={ classes.container }>
			{
				generateTiles().map(i => <div key={ i } className={ classes.tiles }>
											<CircularProgress
												className={ classes.progress }
												color="secondary"
												size={50}
											/>
										</div>)
			}
		</div>
	)
}


CharactersLoading.propTypes = {
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(CharactersLoading);