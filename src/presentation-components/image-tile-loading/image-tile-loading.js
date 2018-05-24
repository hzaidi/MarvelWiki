import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
	container: {

	},
	tiles: {
		display: 'flex',
		justifyContent: 'center',
		margin: '1px',
		background: '#2d2d2d',
		width: '100%',
		height: '324px;',
		opacity: 0.8
	},
	progress: {
		alignSelf: 'center',
		margin: theme.spacing.unit * 2,
  	}
});


const ImageTileLoading = (props) => {
	const { classes } = props;
	const generateTiles = () => {
		return Array.from({length: 12}).map((x, i) => i);
	}
	return (
		<div className={ classes.container }>
				<Grid container spacing={8}>
					{
						generateTiles().map(i =>
									<Grid item key={ i } xs={6} sm={4} md={3} lg={2}>
										<div className={ classes.tiles }>
											<CircularProgress
												className={ classes.progress }
												color="secondary"
												size={50}
											/>
										</div>
									</Grid>
									)
					}
				</Grid>
		</div>
	)
}


ImageTileLoading.propTypes = {
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(ImageTileLoading);