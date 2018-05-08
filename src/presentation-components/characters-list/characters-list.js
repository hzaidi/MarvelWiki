import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { InputAdornment } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import SearchCircle from '@material-ui/icons/Search';
import { CircularProgress } from 'material-ui/Progress';
import Typography from "material-ui/Typography";
import CharacterTile from '../character-tile/character-tile';
import { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { FormControl } from 'material-ui/Form';

const styles = theme => ({
	listContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center'
	},
	searchContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	margin: {
		alignItems: 'center',
		margin: theme.spacing.unit,
	},
	formControl: {
		alignItems: 'center',
		margin: theme.spacing.unit
	},
});

const filterObject = {
	nameStartsWith: '',
	orderBy: 'name'
}


const CharactersList = (props) => {
	const { classes } = props;

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

	function renderContent() {
		if(props.characters.length) {
			return (
				<div className={ classes.listContainer }>
					{ props.characters.map(character => <CharacterTile key={ character.id } character={ character } onClickCharacter={ props.onClickCharacter }/>) }
				</div>
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
			<div className={ classes.searchContainer }>
				<TextField
					className={classes.margin}
					type="search"
					onChange={ onChangeFilterText }
					label="Search your hero"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								{ props.searching ? <CircularProgress color="secondary" size={25} /> : <SearchCircle /> }
							</InputAdornment>
						),
					}}
				/>
				<FormControl className={classes.formControl}>
					<InputLabel htmlFor="orderBy-native-simple">Order By</InputLabel>
					<Select
						native
						value={filterObject.orderBy}
						onChange={ onChangeOrderBy }
						inputProps={{
						id: 'orderBy-native-simple',
						}}
					>
						<option value="modified">Modifed</option>
						<option value="name">Name</option>
					</Select>
				</FormControl>
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