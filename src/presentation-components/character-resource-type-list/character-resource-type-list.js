import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ImageTile from '../image-tile/image-tile';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroller';
import ImageTileLoading from '../image-tile-loading/image-tile-loading'

const styles = theme => ({
	container: {
		position: 'relative',
		width: '90%',
		margin: '0 auto'
	},
	contentContainer: {
		padding: 10
	},
	loader:{
		display: 'flex',
		justifyContent: 'center'
	}
});


const CharacterResourceTypeList = (props) => {
	const { classes, resourceTypeData, loadMore, onClick } = props;
	function loadFunc() {
		loadMore();
	}
	function onClickTile(id){
		onClick(id);
	}
	function renderContent() {
		if(resourceTypeData.fetching){
			return (
				<ImageTileLoading xs={6} sm={3} md={2} lg={2}/>
			)
		}else{
			return (
				<InfiniteScroll
					pageStart={0}
					initialLoad={ false }
					loadMore={ loadFunc }
					hasMore={ (resourceTypeData.collection.length < resourceTypeData.filter.total) }
					loader={<div className={ classes.loader } key={0}><CircularProgress color="secondary" size={40}/></div>}
				>
					<Grid container spacing={24} justify="center">
						{
							resourceTypeData.collection.map(resource => (
								<Grid key={ resource.id } xs={6} sm={3} md={2} lg={2} item>
									<ImageTile
										id={resource.id}
										variant="body1"
										title={ resource.title }
										imageUrl={ resource.imageUrl }
										imageSize="portrait_uncanny"
										noWrap={ false }
										onClick={ onClickTile }/>
								</Grid>
							))
						}
					</Grid>
				</InfiniteScroll>
			)
		}
	}

	return (
		<div className={ classes.container }>
			<div className={ classes.contentContainer }>
				{ renderContent() }
			</div>
		</div>
	)
}


CharacterResourceTypeList.propTypes = {
	resourceTypeString: PropTypes.string,
	resourceTypeData: PropTypes.object.isRequired,
	loadMore: PropTypes.func.isRequired,
	onClick: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(CharacterResourceTypeList);