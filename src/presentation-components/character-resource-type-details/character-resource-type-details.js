import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CharacterTile from '../character-tile/character-tile';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
	container: {
		position: 'relative',
		border: '1px solid #7c7c7c',
		borderRadius: 5
	},
	contentContainer: {
		padding: 10
	},
	progress: {
		margin: theme.spacing.unit * 2,
	  },
	header: {
		padding: 10,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		backgroundColor: '#403e3e'
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
	const { classes, resourceTypeData, resourceTypeString, fetching, metaRecord } = props;
	console.log(metaRecord)
	function renderContent() {
		if(fetching){
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
					{resourceTypeData.map(resource => (
						<Grid key={ resource.id } xs={3} sm={2} md={2} lg={2} item>
							<CharacterTile
								id={resource.id}
								title={ resource.title }
								imageUrl={ resource.imageUrl }
								imageSize="portrait_fantastic"
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
			<Typography gutterBottom variant="display1" noWrap={ true } color="textSecondary" className={ classes.header }>
				{ resourceTypeString }
			</Typography>
			<div className={ classes.contentContainer } style={ (metaRecord.total > metaRecord.limit) ? { marginBottom: 40 } : {} }>
				{ renderContent() }
			</div>
			{
				(metaRecord.total > metaRecord.limit) ? <div className={ classes.footer }></div> : null
			}

		</div>
	)
}


CharacterResourceTypeDetails.propTypes = {
	resourceTypeString: PropTypes.string.isRequired,
	resourceTypeData: PropTypes.array.isRequired,
	metaRecord: PropTypes.object.isRequired,
	fetching: PropTypes.bool.isRequired,
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(CharacterResourceTypeDetails);