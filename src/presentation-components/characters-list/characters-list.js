import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from "material-ui/Typography";
import CharacterTile from '../character-tile/character-tile';
import CharacterSearchFilter from '../character-search-filter/character-search-filter';
import Grid from 'material-ui/Grid';
import { searchFilterObject } from '../../actions/charactersActions';

const styles = theme => ({
	container: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center'
	}
});



const CharactersList = (props) => {
	const { classes, searching, metaRecord } = props;

	function onChangeFilterText(event) {
		event.persist();
		searchFilterObject.nameStartsWith = event.target.value;
		props.onFilter(searchFilterObject);
	}

	function onChangeOrderBy(event) {
		event.persist();
		searchFilterObject.orderBy = event.target.value;
		props.onFilter(searchFilterObject);
	}

	function onChangeModifiedSince(event) {
		event.persist();
		searchFilterObject.modifiedSince = event.target.value;
		props.onFilter(searchFilterObject);
	}

	function onNext() {
		props.onNavigation('next');
	}

	function onPrevious(){
		props.onNavigation('previous');
	}

	function renderContent() {
		if(props.characters.length) {
			return (
					<Grid container spacing={0} className={ classes.container }>
					{
						props.characters.map(character => {
							return <Grid  key={ character.id } item>
										<CharacterTile character={ character } onClickCharacter={ props.onClickCharacter }/>
									</Grid>
						})
					}
					</Grid>
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
			<CharacterSearchFilter
				metaRecord={ metaRecord }
				searching={ searching }
				onChangeFilterText={ onChangeFilterText }
				onChangeOrderBy={ onChangeOrderBy }
				onChangeModifiedSince={ onChangeModifiedSince }
				onNext={ onNext }
				onPrevious={ onPrevious }
				/>
			{ renderContent() }
		</div>
	)
}


CharactersList.propTypes = {
	metaRecord: PropTypes.object.isRequired,
	searching: PropTypes.bool.isRequired,
	onClickCharacter: PropTypes.func.isRequired,
	onFilter: PropTypes.func.isRequired,
	onNavigation: PropTypes.func.isRequired,
	characters: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(CharactersList);