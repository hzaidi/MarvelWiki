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
import CharacterDetailsTopSection from '../../presentation-components/character-details-top-section/character-details-top-section'
import CharacterDetailsContentSection from '../../presentation-components/character-details-content-section/character-details-content-section'

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
	if(character.comics.items.length) { resourceType.push({typeName: 'Comics', items: character.comics.items,resourceCount: character.comics.available }) }
	if(character.events.items.length) { resourceType.push({typeName: 'Events', items: character.events.items,resourceCount: character.events.available }) }
	if(character.series.items.length) { resourceType.push({typeName: 'Series', items: character.series.items,resourceCount: character.series.available }) }
	if(character.stories.items.length) { resourceType.push({typeName: 'Stories', items: character.stories.items,resourceCount: character.stories.available }) }
	return resourceType;
}

class CharacterContainer extends Component {
	state = {
		resource: null,
		resourceTypes: [] //populateResourceTypes(character)
	};

	handleChange = (event, resource) => {
		this.setState({ resource });
	};

	componentDidMount() {
		const { comicsMetaRecord } = this.props;
		this.props.fetchCharacterById(this.props.params.characterId).then(() => {
			const resourceTypes = populateResourceTypes(this.props.character);
			this.setState({ resourceTypes });
		});


	};

	renderContent() {
		const { fetchingCharacter, character , classes, comics , fetchingComics , comicsMetaRecord} = this.props;
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
									return rt.items.length > 0 &&
										<Grid item xs={3} className={ classes.alignButtons } key={ rt.typeName }>
											<Badge color="primary" badgeContent={rt.resourceCount} className={classes.margin}>
												<Button size="large" variant="flat">{ rt.typeName }</Button>
											</Badge>
										</Grid>
								})
							}
						</Grid>
					</div>
					<div>
						<CharacterDetailsContentSection
							fetching={ fetchingComics }
							resourceTypeString = "Comics"
							resourceData= { comics }
							metaRecord= { comicsMetaRecord }
						/>
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
	const { comics } = state.comicsState;
	const fetchingCharacter = state.charactersState.fetching;
	const fetchingComics = state.comicsState.fetching;
	const comicsMetaRecord = state.comicsState.metaRecord;
	return {
		params,
		character,
		fetchingCharacter,
		comics,
		fetchingComics,
		comicsMetaRecord
	}
}
const mapActionsToProp = {
	fetchCharacterById,
	fetchComicsByCharacterId
}

export default compose(
	withStyles(styles, { name: 'CharacterContainer' }),
	connect(mapStateToProps, mapActionsToProp)
)(CharacterContainer);

