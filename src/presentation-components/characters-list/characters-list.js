import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { InputAdornment } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import SearchCircle from '@material-ui/icons/Search';
import { CircularProgress } from 'material-ui/Progress';
import Typography from "material-ui/Typography";
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

	function renderContent() {
		if(props.characters.length) {
			return (
				<div className={ classes.listContainer }>
					{ props.characters.map(character => <CharacterTile key={ character.id } character={ character }/>) }
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
			<TextField
				className={classes.margin}
				type="search"
				onChange={ onChangeFilter }
				label="Search your hero"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							{ props.searching ? <CircularProgress color="secondary" size={25} /> : <SearchCircle /> }
						</InputAdornment>
					),
				}}
			/>
			{ renderContent() }
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