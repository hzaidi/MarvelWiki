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
		display: 'flex',
		justifyContent: 'center'
	},
	progress: {
	  	margin: theme.spacing.unit * 2,
	},
	alignButtons:{
		textAlign: 'center'
	}
});

class CharacterContainer extends Component {
	state = {
		value: 0
	};

	handleChange = (event, value) => {
		this.setState({ value });
		debugger;
	};

	componentDidMount() {
		const { comicsMetaRecord } = this.props;
		this.props.fetchCharacterById(this.props.params.characterId);
		this.props.fetchComicsByCharacterId(this.props.params.characterId, comicsMetaRecord);
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
				<div>
					<CharacterDetailsTopSection character={ character } />
					<div>
						<Grid container>
							{
								character.comics.items.length > 0  &&
								<Grid item xs={3} className={ classes.alignButtons }>
									<Badge color="primary" badgeContent={character.comics.available} className={classes.margin}>
										<Button variant="flat">Comics</Button>
									</Badge>
								</Grid>
							}
							{
								character.events.items.length > 0  &&
								<Grid item xs={3} className={ classes.alignButtons }>
									<Badge color="primary" badgeContent={character.events.available} className={classes.margin}>
										<Button variant="flat">Events</Button>
									</Badge>
								</Grid>
							}
							{
								character.series.items.length > 0 &&
								<Grid item xs={3} className={ classes.alignButtons }>
									<Badge color="primary" badgeContent={character.series.available} className={classes.margin}>
										<Button variant="flat">Series</Button>
									</Badge>
								</Grid>
							}
							{
								character.stories.items.length > 0 &&
								<Grid item xs={3} className={ classes.alignButtons }>
									<Badge color="primary" badgeContent={character.stories.available} className={classes.margin}>
										<Button variant="flat">Stories</Button>
									</Badge>
								</Grid>
							}
						</Grid>
					</div>
					<div>
						<CharacterDetailsContentSection
							character={ character }
							tabValue={ this.state.value }
							fetching={ fetchingComics }
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

