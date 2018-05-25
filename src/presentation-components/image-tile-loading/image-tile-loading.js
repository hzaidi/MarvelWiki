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
		height: 300,
		opacity: 0.8
	},
	progress: {
		alignSelf: 'center',
		margin: theme.spacing.unit * 2,
  	}
});

const default_xs = 6;
const default_sm = 6;
const default_md = 3;
const default_lg = 2;
const default_xl = 3;
const default_tileCount = 24;

const ImageTileLoading = (props) => {
	const { classes } = props;
	const tileCount = (props.tileCount != null) ? props.tileCount : default_tileCount;
	const xs = (props.xs) ? props.xs : default_xs;
	const sm = (props.sm) ? props.sm : default_sm;
	const md = (props.md) ? props.md : default_md;
	const lg = (props.lg) ? props.lg : default_lg;
	const xl = (props.xl) ? props.xl : default_xl;
	const generateTiles = () => {
		return Array.from({length: tileCount }).map((x, i) => i);
	}
	return (
		<div className={ classes.container }>
				<Grid container spacing={8}>
					{
						generateTiles().map(i =>
									<Grid item key={ i } xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
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
	tileCount: PropTypes.number,
	xs: PropTypes.number,
	sm: PropTypes.number,
	md: PropTypes.number,
	lg: PropTypes.number,
	xl: PropTypes.number
  };

  export default withStyles(styles)(ImageTileLoading);