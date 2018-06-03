import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ImageTile from '../image-tile/image-tile';
import Grid from '@material-ui/core/Grid';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';
import RatingPanel from '../rating-panel/rating-panel'

const styles = theme => ({
	container: {
	},
	loader:{
		display: 'flex',
		justifyContent: 'center'
	},
	tileContainer:{
		position: 'relative'
	},
	ratingContainer: {
		position: 'absolute',
		width: '100%',
		bottom: 0,
	},
	ratingPanel:{
		marginBottom:10
	}
});



const CharactersList = (props) => {
	const { classes, loadMore, filter, onClickCharacter, onLove, onLike, onDislike } = props;
	function loadFunc() {
		loadMore();
	}
	function renderContent() {
		if(props.characters.length) {
			return (
				<InfiniteScroll
						pageStart={ 1 }
						initialLoad={ false }
						loadMore={loadFunc}
						threshold={ 100 }
						hasMore={ (props.characters.length < filter.total) }
						loader={<div className={ classes.loader } key={0}><CircularProgress className={ classes.progress } color="secondary" size={50}/></div>}
					>
					<Grid container spacing={ 16 } className={ classes.container }>
					{
						props.characters.map(character => {
							return <Grid key={ character.id } xs={6} sm={4} md={3} lg={2} item>
										<div className={ classes.tileContainer }>
											<ImageTile
												id={character.id}
												title={ character.name }
												imageSize="portrait_fantastic"
												imageUrl={ character.imageUrl }
												onClick={ onClickCharacter }
												footer={
													<RatingPanel
														id={ character.id }
														likes={ character.likes }
														loves={ character.loves }
														dislikes={ character.dislikes }
														onLove={ onLove }
														onLike={ onLike }
														onDislike={ onDislike }/>
												}/>
											{/* <div className={ classes.ratingContainer }>

											</div> */}
										</div>
									</Grid>
						})
					}
					</Grid>
				</InfiniteScroll>
				)
		}else {
			return (
				<Typography variant="caption">
					Unable to find any result.
				</Typography>
			)
		}
	}

	return (
		<div className={classes.container}>
			{ renderContent() }
		</div>
	)
}


CharactersList.propTypes = {
	onClickCharacter: PropTypes.func.isRequired,
	filter: PropTypes.object.isRequired,
	loadMore: PropTypes.func.isRequired,
	characters: PropTypes.array.isRequired,
	onLove: PropTypes.func.isRequired,
	onLike: PropTypes.func.isRequired,
	onDislike: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(CharactersList);