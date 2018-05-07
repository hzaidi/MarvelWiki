import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { InputAdornment } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import SearchCircle from '@material-ui/icons/Search';
import { CircularProgress } from 'material-ui/Progress';
import CharacterTile from '../character-tile/character-tile';


const styles = theme => ({
	listContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center'
	},
	margin: {
		width: '100%',
		margin: theme.spacing.unit,
	}
});


const CharactersList = (props) => {
	const { classes } = props;

	function onChangeFilter(event) {
		event.persist();
		props.onSearch(event.target.value);
	}

	return (
		<div>
			<TextField
				className={classes.margin}
				type="search"
				onChange={ onChangeFilter }
				label="Search your hero"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							{props.searching && <CircularProgress color="secondary" size={25} />}
							{!props.searching && <SearchCircle /> }
						</InputAdornment>
					),
				}}
			/>

			<div className={ classes.listContainer }>
				{ props.characters.map(character => <CharacterTile key={ character.id } character={ character }/>) }
			</div>
		</div>
	)
}


CharactersList.propTypes = {
	searching: PropTypes.bool.isRequired,
	onSearch: PropTypes.func.isRequired,
	characters: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(CharactersList);