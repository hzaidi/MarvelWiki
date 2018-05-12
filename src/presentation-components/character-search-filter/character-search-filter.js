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
import { searchFilterObject } from '../../actions/charactersActions';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from "material-ui/Typography";
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

const styles = theme => ({
	container:{
		width: '100%'
	},
	searchContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		backgroundColor:'#383838',
		padding: '0 20px;',
		aligItems: 'flex-end',
		marginBottom: '10px;'
	},
	searchNavigateButtons:{
		display: 'flex',
		justifyContent: 'flex-end'
	},
	formControl:{
		margin: theme.spacing.unit,
		flexGrow: 1,
	},
	total:{
		display: 'flex',
		alignItems: 'center'
	},
	topFilter: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		padding: '0 20px;',
		alignItems: 'flex-end',
		backgroundColor:'#2d2d2d',
	}
});

const CharacterSearchFilter = (props) => {
	const { metaRecord, classes, searching, onChangeFilterText, onChangeOrderBy, onChangeModifiedSince, onNext, onPrevious} = props;
	console.log(metaRecord);
	return (
		<div className={ classes.container }>
			<div className={ classes.topFilter }>
				<FormControl className={ classes.formControl }>
					<InputLabel htmlFor="orderBy-native-simple">Order By</InputLabel>
					<Select
						native
						value={searchFilterObject.orderBy}
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
						defaultValue={ searchFilterObject.modifiedSince }
						helperText="Heros that are modified after date specifed above"
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</FormControl>
			</div>
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
				<Typography className={ classes.total } variant="subheading" noWrap={ true } color="default">
					{ metaRecord.total } heros
				</Typography>
				<div className={ [classes.formControl,classes.searchNavigateButtons].join(' ') }>
					<Button onClick={ onPrevious } variant="flat" size="small">
						<ChevronLeft/>
					</Button>
					<Button onClick={ onNext } variant="flat" size="small" >
						<ChevronRight/>
					</Button>
				</div>
			</div>
		</div>
	)
}


CharacterSearchFilter.propTypes = {
	metaRecord: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	onChangeFilterText: PropTypes.func.isRequired,
	onChangeOrderBy: PropTypes.func.isRequired,
	onChangeModifiedSince: PropTypes.func.isRequired,
	searching: PropTypes.bool.isRequired,
	onNext: PropTypes.func.isRequired,
	onPrevious: PropTypes.func.isRequired
  };

  export default withStyles(styles)(CharacterSearchFilter);