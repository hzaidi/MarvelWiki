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
		marginBottom: '10px;',
	},
	alignRight :{
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
	rightFilters: {
		marginLeft: '5px;'
	}
});

const listOfYears = () => {
	let currentdate = new Date();
	let currentYear = currentdate.getFullYear();
	let years = [];
	for(let i=currentYear; i >= currentYear - 10; i--){
		years.push(i);
	}
	return years;
}


const CharacterSearchFilter = (props) => {
	const { metaRecord, classes, searching, onChangeFilterText, onChangeOrderBy, onChangeModifiedSince, onNext, onPrevious} = props;
	const defaultYear = (new Date(searchFilterObject.modifiedSince)).getUTCFullYear();
	return (
		<div className={ classes.container }>
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

				<div className={ [classes.formControl,classes.alignRight ].join(' ') }>
					<FormControl className={ classes.rightFilters }>
						<InputLabel htmlFor="orderBy-native-simple">Order By</InputLabel>
						<Select
							native
							value={searchFilterObject.orderBy}
							onChange={ onChangeOrderBy }
							inputProps={{ id: 'year-native-simple' }}
						>
							<option value="name">A-Z</option>
							<option value="-name">Z-A</option>
							<option value="modified">Modifed</option>
						</Select>
					</FormControl>
					<FormControl className={ classes.rightFilters }>
						<InputLabel htmlFor="year-native-simple">Modified Since</InputLabel>
						<Select
							native
							value={ defaultYear }
							onChange={ onChangeModifiedSince }
							inputProps={{ id: 'orderBy-native-simple' }}
						>
							{ listOfYears().map(year => <option key={ year } value={ year }>{ year }</option>) }
						</Select>
					</FormControl>
					<Button  className={ classes.rightFilters } onClick={ onPrevious } disabled={ metaRecord.offset === 0 } variant="flat" size="small">
						<ChevronLeft/>
					</Button>
					<Button  className={ classes.rightFilters } onClick={ onNext } disabled={ metaRecord.offset >= metaRecord.total } variant="flat" size="small" >
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