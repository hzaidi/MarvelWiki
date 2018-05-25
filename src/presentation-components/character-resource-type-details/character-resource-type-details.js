import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ImageTile from '../image-tile/image-tile';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ImageTileLoading from '../image-tile-loading/image-tile-loading'

const styles = theme => ({
	container: {
		position: 'relative',
		width: '100%'
	},
	contentContainer: {
		padding: 10
	}
});


const CharacterResourceTypeDetails = (props) => {
	const { classes, resourceTypeData, resourceTypeString } = props;
	function renderContent() {
		if(resourceTypeData.fetching){
			return (
				<ImageTileLoading xs={6} sm={6} md={2} lg={2}/>
			)
		}else{
			return (
				<Grid container spacing={24} justify="center">
					{
						resourceTypeData.collection.map(resource => (
							<Grid key={ resource.id } xs={6} sm={6} md={2} lg={2} item>
								<ImageTile
									id={resource.id}
									variant="body1"
									title={ resource.title }
									imageUrl={ resource.imageUrl }
									imageSize="portrait_uncanny"
									noWrap={ false }
									onClick={ () => {} }/>
							</Grid>
						))
					}
				</Grid>
			)
		}
	}

	return (
		<div className={ classes.container }>
			<Typography gutterBottom variant="display1" noWrap={ true } color="default" className={ classes.header }>
				{ resourceTypeString }
			</Typography>
			<div className={ classes.contentContainer }>
				{ renderContent() }
			</div>
		</div>
	)
}


CharacterResourceTypeDetails.propTypes = {
	resourceTypeString: PropTypes.string,
	resourceTypeData: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(CharacterResourceTypeDetails);