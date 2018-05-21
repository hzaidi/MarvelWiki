import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CharacterTile from '../character-tile/character-tile';
import Grid from '@material-ui/core/Grid';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
	container: {
	},
	loader:{
		display: 'flex',
		justifyContent: 'center'
	}
});



const CharactersList = (props) => {
	const { classes, loadMore, metaRecord } = props;
	function loadFunc() {
		loadMore();
	}
	function renderContent() {
		if(props.characters.length) {
			return (
				<InfiniteScroll
						pageStart={0}
						initialLoad={ false }
						loadMore={loadFunc}
						hasMore={ (metaRecord.offset <= metaRecord.total) }
						loader={<div className={ classes.loader } key={0}><CircularProgress className={ classes.progress } color="secondary" size={50}/></div>}
					>
					<Grid container spacing={8} className={ classes.container }>
					{
						props.characters.map(character => {
							return <Grid key={ character.id } xs={6} sm={4} md={3} lg={2} item>
										<CharacterTile
											id={character.id}
											title={ character.name }
											imageUrl={ character.imageUrl }
											onClick={ props.onClickCharacter }/>
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
	metaRecord: PropTypes.object.isRequired,
	loadMore: PropTypes.func.isRequired,
	characters: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(CharactersList);