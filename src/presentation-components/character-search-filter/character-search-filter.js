import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { FormControl } from 'material-ui/Form';
import { InputAdornment } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import SearchCircle from '@material-ui/icons/Search';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
	searchContainer: {
		display: 'flex',
		flexDirection: 'row',
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

const CharacterSearchFilter = (props) => {
	const { classes, searching, onChangeFilterText, onChangeOrderBy, onChangeModifiedSince} = props;
	return (
		<div className={ classes.searchContainer }>
			<FormControl className={ classes.formControl }>
				<TextField
					type="search"
					onChange={ onChangeFilterText }
					label="Search your hero"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								{ searching ? <CircularProgress color="secondary" size={25} /> : <SearchCircle /> }
							</InputAdornment>
						),
					}}
				/>
			</FormControl>
			<FormControl className={ classes.formControl }>
				<InputLabel htmlFor="orderBy-native-simple">Order By</InputLabel>
				<Select
					native
					value={filterObject.orderBy}
					onChange={ onChangeOrderBy }
					inputProps={{ id: 'orderBy-native-simple' }}
				>
					<option value="modified">Modifed</option>
					<option value="name">Name</option>
				</Select>
			</FormControl>
			<FormControl className={ classes.formControl }>
				<TextField
					id="date"
					label="Modified Since"
					type="date"
					onChange={ onChangeModifiedSince }
					defaultValue={ filterObject.modifiedSince }
					helperText="Bring back heros that are modified after date specifed above"
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</FormControl>
		</div>
	)
}


CharacterSearchFilter.propTypes = {
	classes: PropTypes.object.isRequired,
	onChangeFilterText: PropTypes.func.isRequired,
	onChangeOrderBy: PropTypes.func.isRequired,
	onChangeModifiedSince: PropTypes.func.isRequired,
	searching: PropTypes.bool.isRequired,
  };

  export default withStyles(styles)(CharacterSearchFilter);