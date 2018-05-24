import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ImageTile from '../image-tile/image-tile';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
	container: {
		position: 'relative',
		width: '100%'
	},
	contentContainer: {
		padding: 10
	},
	progress: {
		margin: theme.spacing.unit * 2,
	  },
	header: {
		padding: 10
	},
	footer:{
		position:'absolute',
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		zIndex :1,
		bottom: 0,
		left: 0,
		pointerEvents:'none',
		backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255, 0), rgba(0, 0, 0, 1) 90%)',
		width: '100%',
		height: '10em'
	}
});


const CharacterResourceTypeDetails = (props) => {
	const { classes, resourceTypeData, resourceTypeString } = props;
	function renderContent() {
		if(resourceTypeData.fetching){
			return (
				<CircularProgress
					className={ classes.progress }
					color="secondary"
					size={50}
				/>
			)
		}else{
			return (
				<Grid container spacing={24} justify="center">
					{resourceTypeData.collection.map(resource => (
						<Grid key={ resource.id } xs={6} sm={6} md={2} lg={2} item>
							<ImageTile
								id={resource.id}
								variant="body1"
								title={ resource.title }
								imageUrl={ resource.imageUrl }
								imageSize="portrait_uncanny"
								noWrap={ false }
								onClick={ onClikc }/>
						</Grid>
					))}
				</Grid>
			)
		}
	}
	function onClikc(){

	}
	return (
		<div className={ classes.container }>
			<Typography gutterBottom variant="display1" noWrap={ true } color="default" className={ classes.header }>
				{ resourceTypeString }
			</Typography>
			<div className={ classes.contentContainer }>
				{ renderContent() }
			</div>
			{/* {
				(resourceTypeData.metaRecord.total > resourceTypeData.metaRecord.limit) ? <div className={ classes.footer }></div> : null
			} */}

		</div>
	)
}


CharacterResourceTypeDetails.propTypes = {
	resourceTypeString: PropTypes.string,
	resourceTypeData: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(CharacterResourceTypeDetails);