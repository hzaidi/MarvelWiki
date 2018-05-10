import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from "material-ui/Typography";
import CharacterTile from '../character-tile/character-tile';
import CharacterSearchFilter from '../character-search-filter/character-search-filter';
import Grid from 'material-ui/Grid';

const styles = theme => ({
	container: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center'
	},
	formControl:{
		minWidth: '200px',
		margin: theme.spacing.unit,
	}
});

const filterObject = {
	nameStartsWith: '',
	orderBy: 'name',
	modifiedSince: '2010-01-01'
}


const CharactersList = (props) => {
	const { classes, searching } = props;

	function onChangeFilterText(event) {
		event.persist();
		filterObject.nameStartsWith = event.target.value;
		props.onFilter(filterObject);
	}

	function onChangeOrderBy(event) {
		event.persist();
		filterObject.orderBy = event.target.value;
		props.onFilter(filterObject);
	}

	function onChangeModifiedSince(event) {
		event.persist();
		filterObject.modifiedSince = event.target.value;
		props.onFilter(filterObject);
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
		<div>
			<div className={classes.searchContainer}>
				<CharacterSearchFilter
						searching={ searching }
						onChangeFilterText={ onChangeFilterText }
						onChangeOrderBy={ onChangeOrderBy }
						onChangeModifiedSince={ onChangeModifiedSince }
						/>
			</div>
			{ renderContent() }
		</div>
	)
}


CharactersList.propTypes = {
	searching: PropTypes.bool.isRequired,
	onClickCharacter: PropTypes.func.isRequired,
	onFilter: PropTypes.func.isRequired,
	characters: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(CharactersList);