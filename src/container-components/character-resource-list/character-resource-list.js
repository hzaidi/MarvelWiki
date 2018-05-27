import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { fetchComicsByCharacterId, onLoadMore as loadMoreComics } from '../../actions/comicsActions';
import { fetchEventsByCharacterId, onLoadMore as loadMoreEvents } from '../../actions/eventsActions';
import { fetchSeriesByCharacterId, onLoadMore as loadMoreSeries } from '../../actions/seriesActions';
import CharacterResourceTypeList from '../../presentation-components/character-resource-type-list/character-resource-type-list'

const styles = theme => ({
	container:{
		display: 'flex',
		justifyContent: 'center'
	},
	contentContainer: {
		width: '100%'
	},
	padding: {
		padding: `0 ${theme.spacing.unit * 2}px`,
	}
});


const COMICS = 'Comics';
const EVENTS = 'Events';
const SERIES = 'Series';

class CharacterResourceList extends Component {
	//Local Component State
	state = {
		value: 0
	};

	get resources() {
		const { fetchComicsByCharacterId, fetchEventsByCharacterId, fetchSeriesByCharacterId, character } = this.props;
		if(!Object.keys(character).length) { return []; }
		let resourceType = [];
		if(character.comics.items.length) { resourceType.push({typeName: COMICS, stateName: 'comicsState', resourceCount: character.comics.available, dataCall: fetchComicsByCharacterId, loadMoreCall: this.loadMoreComicsTrigger }) }
		if(character.events.items.length) { resourceType.push({typeName: EVENTS, stateName: 'eventsState', resourceCount: character.events.available, dataCall: fetchEventsByCharacterId, loadMoreCall: this.loadMoreEventsTrigger }) }
		if(character.series.items.length) { resourceType.push({typeName: SERIES, stateName: 'seriesState', resourceCount: character.series.available, dataCall: fetchSeriesByCharacterId, loadMoreCall: this.loadMoreSeriesTrigger}) }
		return resourceType;
	}

	componentDidMount(){
		this.triggerDataCall();
	}

	handleChange = (event, value) => {
		this.setState({ value },this.triggerDataCall.bind(this));
	};

	triggerDataCall(){
		const { character } = this.props;
		console.log(this.props)
		const selectedResource = this.resources[this.state.value];
		selectedResource.dataCall(character.id);
	}

	loadMoreComicsTrigger() {
		const { loadMoreComics, comicsState, params } = this.props;
		const { filter } = comicsState;
		loadMoreComics(params.characterId, filter);
	}
	loadMoreEventsTrigger() {
		const { loadMoreEvents, eventsState, params } = this.props;
		const { filter } = eventsState;
		loadMoreEvents(params.characterId, filter);
	}
	loadMoreSeriesTrigger() {
		const { loadMoreSeries, seriesState, params } = this.props;
		const { filter } = seriesState;
		loadMoreSeries(params.characterId, filter);
	}

	onClick(id){
		const { history, character } = this.props;
		const selectedResource = this.resources[this.state.value];
		history.push(`/character/${character.id}/${selectedResource.typeName}/${id}`);
	}

  	render() {
		const { classes } = this.props;
		return (
			<div className={ classes.container }>
				<div className={ classes.contentContainer }>
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
								<CharacterResourceTypeList
									key={ r.typeName }
									resourceTypeString={ r.typeName }
									resourceTypeData={ this.props[r.stateName] }
									loadMore={ r.loadMoreCall.bind(this) }
									onClick={ this.onClick.bind(this) }
								/>
						})
					}
				</div>
			</div>
		);
  	}
}

const mapStateToProps = (state, props) => {
	const { character } = state.charactersState;
	const { comic, ...comicsState } = state.comicsState;
	const { event, ...eventsState } = state.eventsState;
	const { serial, ...seriesState } = state.seriesState;
	return {
		character,
		comicsState,
		eventsState,
		seriesState
	}
}
const mapActionsToProp = {
	fetchComicsByCharacterId,
	fetchEventsByCharacterId,
	fetchSeriesByCharacterId,
	loadMoreComics,
	loadMoreEvents,
	loadMoreSeries
}

export default compose(
	withStyles(styles, { name: 'CharacterResourceList' }),
	connect(mapStateToProps, mapActionsToProp)
)(CharacterResourceList);

