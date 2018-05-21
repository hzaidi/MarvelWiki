import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField';
import SearchCircle from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { searchFilterObject } from '../../actions/charactersActions';



const styles = theme => ({
	container:{
		width: '100%',
		boxShadow: '3px 3px 20px 6px #2b2b2b'
	},
	searchContainer: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor:'#383838',
		padding: '15px;',
		marginBottom: '10px;',
	},
	rightFilters: {
		marginLeft: '5px;'
	},
	flexBox:{
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	flexItem: {
		flexGrow: 1
	}
});

const listOfYears = () => {
	let currentdate = new Date();
	let currentYear = currentdate.getFullYear();
	let years = [];
	for(let i=currentYear; i >= currentYear - 20; i--){
		years.push(i);
	}
	return years;
}


const CharacterSearchFilter = (props) => {
	const { metaRecord, classes, searching, onChangeFilterText, onChangeOrderBy, onChangeModifiedSince } = props;
	const defaultYear = (new Date(searchFilterObject.modifiedSince)).getUTCFullYear();
	return (
		<div className={ classes.container }>
			<div className={ classes.searchContainer }>
				<Grid container spacing={24} direction="row">
					<Grid item xs={12} lg={9} md={9} className={ classes.flexBox }>
						<TextField
							className={ classes.flexItem }
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
						<Typography variant="headline" noWrap={ true } color="textSecondary">
							{ (metaRecord.total) ? metaRecord.total : <CircularProgress color="secondary" size={25} /> } heros
						</Typography>
					</Grid>
					<Grid item xs={12} lg={1} md={1}  className={ classes.flexBox }>
						<FormControl className={ [classes.rightFilters, classes.flexItem].join(' ') }>
							<InputLabel htmlFor="orderBy-native-simple">Order By</InputLabel>
							<Select
								native
								value={ searchFilterObject.orderBy }
								onChange={ onChangeOrderBy }
								inputProps={{ id: 'year-native-simple' }}
							>
								<option value="name">A-Z</option>
								<option value="-name">Z-A</option>
								<option value="modified">Modifed</option>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} lg={2} md={2}  className={ classes.flexBox }>
						<FormControl className={ [classes.rightFilters, classes.flexItem].join(' ') }>
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
					</Grid>
				</Grid>
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
	searching: PropTypes.bool.isRequired
  };

  export default withStyles(styles)(CharacterSearchFilter);