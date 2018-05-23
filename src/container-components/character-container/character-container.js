import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import { fetchCharacterById } from '../../actions/charactersActions';
import { fetchComicsByCharacterId } from '../../actions/comicsActions';
import { fetchEventsByCharacterId } from '../../actions/eventsActions';
import { fetchSeriesByCharacterId } from '../../actions/seriesActions';
import { fetchStoriesByCharacterId } from '../../actions/storiesAction';
import CharacterDetailsTopSection from '../../presentation-components/character-details-top-section/character-details-top-section'
import CharacterDetailsContentSection from '../../presentation-components/character-details-content-section/character-details-content-section'

const COMICS = 'Comics';
const EVENTS = 'Events';
const SERIES = 'Series';
const STORIES = 'Stories';

const styles = theme => ({
	container: {
		width: '100%'
	},
	progress: {
	  	margin: theme.spacing.unit * 2,
	},
	alignButtons:{
		textAlign: 'center'
	},
	buttonContainer: {
		padding: 20,
		marginTop:20
	}
});

const populateResourceTypes = (character) => {
	let resourceType = [];
	if(character.comics.items.length) { resourceType.push({typeName: COMICS, resourceCount: character.comics.available }) }
	if(character.events.items.length) { resourceType.push({typeName: EVENTS, resourceCount: character.events.available }) }
	if(character.series.items.length) { resourceType.push({typeName: SERIES, resourceCount: character.series.available }) }
	if(character.stories.items.length) { resourceType.push({typeName: STORIES, resourceCount: character.stories.available }) }
	return resourceType;
}

class CharacterContainer extends Component {
	state = {
		resource: null,
		resourceTypes: []
	};

	handleChange = (resource) => {
		this.setState({ resource });
		this.fetchDataByResourceType({ type: resource, characterId: this.props.params.characterId });
	};

	fetchDataByResourceType({ type, characterId }) {
		const { fetchComicsByCharacterId, fetchEventsByCharacterId, fetchSeriesByCharacterId, fetchStoriesByCharacterId } = this.props;
		switch (type) {
			case COMICS:
				fetchComicsByCharacterId(characterId);
				break;
			case EVENTS:
				fetchEventsByCharacterId(characterId);
				break;
			case SERIES:
				fetchSeriesByCharacterId(characterId);
				break;
			case STORIES:
				fetchStoriesByCharacterId(characterId);
				break;
			default:
				throw new Error('Invalid Type')
		}
	}

	componentDidMount() {
		const { fetchCharacterById } = this.props;
		fetchCharacterById(this.props.params.characterId).then(() => {
			const resourceTypes = populateResourceTypes(this.props.character);
			const resource = resourceTypes[0];
			this.setState({ resource: resource.typeName, resourceTypes });
			this.fetchDataByResourceType({ type: resource.typeName, characterId: this.props.params.characterId });
		});
	};

	renderContent() {
		const { fetchingCharacter, character , classes, comicsState, eventsState, storiesState, seriesState } = this.props;
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
				<div className={ classes.container }>
					<CharacterDetailsTopSection character={ character } />
					<div className={ classes.buttonContainer }>
						<Grid container spacing={16}>
							{
								this.state.resourceTypes.map(rt => {
									return rt.resourceCount > 0 &&
										<Grid item xs={3} className={ classes.alignButtons } key={ rt.typeName }>
											<Badge color="primary" badgeContent={rt.resourceCount} className={classes.margin}>
												<Button size="large" variant="flat" onClick={ () => this.handleChange(rt.typeName) }>{ rt.typeName }</Button>
											</Badge>
										</Grid>
								})
							}
						</Grid>
					</div>
					<div>
						{
							this.state.resource === COMICS &&
								<CharacterDetailsContentSection
									resourceTypeString = { this.state.resource }
									resourceData= { comicsState }
								/>
						}
						{
							this.state.resource === EVENTS &&
							<CharacterDetailsContentSection
								resourceTypeString = { this.state.resource }
								resourceData= { eventsState }
							/>
						}
						{
							this.state.resource === SERIES &&
							<CharacterDetailsContentSection
								resourceTypeString = { this.state.resource }
								resourceData= { seriesState }
							/>
						}
						{
							this.state.resource === STORIES &&
							<CharacterDetailsContentSection
								resourceTypeString = { this.state.resource }
								resourceData= { storiesState }
							/>
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
	const { story, ...storiesState } = state.storiesState;
	return {
		params,
		character,
		fetchingCharacter,
		comicsState,
		eventsState,
		seriesState,
		storiesState
	}
}
const mapActionsToProp = {
	fetchCharacterById,
	fetchComicsByCharacterId,
	fetchEventsByCharacterId,
	fetchSeriesByCharacterId,
	fetchStoriesByCharacterId
}

export default compose(
	withStyles(styles, { name: 'CharacterContainer' }),
	connect(mapStateToProps, mapActionsToProp)
)(CharacterContainer);

