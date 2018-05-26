import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { fetchCharacterById } from '../../actions/charactersActions';
import { fetchComicsByCharacterId, onLoadMore as loadMoreComics } from '../../actions/comicsActions';
import { fetchEventsByCharacterId } from '../../actions/eventsActions';
import { fetchSeriesByCharacterId } from '../../actions/seriesActions';
import CharacterDetailsTopSection from '../../presentation-components/character-details-top-section/character-details-top-section'
import CharacterResourceTypeDetails from '../../presentation-components/character-resource-type-details/character-resource-type-details'

const COMICS = 'Comics';
const EVENTS = 'Events';
const SERIES = 'Series';

const styles = theme => ({
	container:{
		display: 'flex',
		justifyContent: 'center'
	},
	contentContainer: {
		width: '100%'
	},
	progress: {
	  	margin: theme.spacing.unit * 2,
	},
	alignButtons:{
		textAlign: 'center'
	},
	buttonContainer: {
		marginTop:20
	},
	padding: {
		padding: `0 ${theme.spacing.unit * 2}px`,
	}
});



class CharacterContainer extends Component {
	//Local Component State
	state = {
		value: 0
	};

	get resources() {
		const { fetchComicsByCharacterId, fetchEventsByCharacterId, fetchSeriesByCharacterId, character } = this.props;
		if(!Object.keys(character).length) { return []; }
		let resourceType = [];
		if(character.comics.items.length) { resourceType.push({typeName: COMICS, stateName: 'comicsState', resourceCount: character.comics.available, dataCall: fetchComicsByCharacterId }) }
		if(character.events.items.length) { resourceType.push({typeName: EVENTS, stateName: 'eventsState', resourceCount: character.events.available, dataCall: fetchEventsByCharacterId }) }
		if(character.series.items.length) { resourceType.push({typeName: SERIES, stateName: 'seriesState', resourceCount: character.series.available, dataCall: fetchSeriesByCharacterId }) }
		return resourceType;
	}

	componentDidMount() {
		const { fetchingCharacter, fetchCharacterById, character, params } = this.props;
		fetchCharacterById(this.props.params.characterId).then(this.triggerDataCall.bind(this));
	};

	handleChange = (event, value) => {
		this.setState({ value },this.triggerDataCall.bind(this));
	};

	triggerDataCall(){
		const { params } = this.props;
		const selectedResource = this.resources[this.state.value];
		selectedResource.dataCall(params.characterId);
	}

	loadMoreComicsTrigger() {
		const { loadMoreComics, updateFiltersForComics, comicsState, params } = this.props;
		const { filter } = comicsState;
		loadMoreComics(params.characterId, filter);
	}

	renderContent() {
		const { fetchingCharacter, character , classes } = this.props;
		if(fetchingCharacter || !Object.keys(character).length)  {
			return (
				<CircularProgress
					className={ classes.progress }
					color="secondary"
					size={75}
				/>
			)
		} else {
			return (
				<div className={ classes.contentContainer }>
					<CharacterDetailsTopSection character={ character } />
					<div className={ classes.buttonContainer }>
						<Tabs value={this.state.value} onChange={this.handleChange} centered indicatorColor="secondary" textColor="secondary">
						{
							this.resources.map(r => {
								return <Tab key={ r.typeName } label={
									<Badge className={classes.padding} color="secondary" badgeContent={r.resourceCount}>
										{ r.typeName }
									</Badge>
								}/>
							})
						}
						</Tabs>
						{
							this.resources.map((r, idx) => {
								return this.state.value === idx &&
									<CharacterResourceTypeDetails
										key={ r.typeName }
										resourceTypeString={ r.typeName }
										resourceTypeData={ this.props[r.stateName] }
										loadMore={ this.loadMoreComicsTrigger.bind(this) }
									/>
							})
						}
					</div>
				</div>

			)
		}
	}

  	render() {
		const { classes } = this.props;
		return (
			<div className={ classes.container }>
				{ this.renderContent() }
			</div>
    	);
  	}
}

const mapStateToProps = (state, props) => {
	const { params } = props.match;
	const { character } = state.charactersState;
	const fetchingCharacter = state.charactersState.fetching;
	const { comic, ...comicsState } = state.comicsState;
	const { event, ...eventsState } = state.eventsState;
	const { serial, ...seriesState } = state.seriesState;
	return {
		params,
		character,
		fetchingCharacter,
		comicsState,
		eventsState,
		seriesState
	}
}
const mapActionsToProp = {
	fetchCharacterById,
	fetchComicsByCharacterId,
	fetchEventsByCharacterId,
	fetchSeriesByCharacterId,
	loadMoreComics
}

export default compose(
	withStyles(styles, { name: 'CharacterContainer' }),
	connect(mapStateToProps, mapActionsToProp)
)(CharacterContainer);

