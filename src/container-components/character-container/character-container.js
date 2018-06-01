import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Route } from 'react-router-dom'
import { fetchCharacterById } from '../../actions/charactersActions';
import { resetState as resetComicState } from '../../actions/comicsActions';
import CharacterDetailsTopSection from '../../presentation-components/character-details-top-section/character-details-top-section'
import CharacterResourceList from '../character-resource-list/character-resource-list';
import ComicDetail from '../comic-detail/comic-detail';
import EventDetail from '../event-detail/event-detail'
import SeriesDetail from '../series-detail/series-detail'

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
	buttonContainer: {
		marginTop:20
	}
});



class CharacterContainer extends Component {

	state = {
		fetching: true
	}

	componentDidMount() {
		const { fetchCharacterById, params } = this.props;
		fetchCharacterById(params.characterId).then(_ => this.setState({ fetching: false }));
	};

	componentWillUnmount() {
		const { resetComicState } = this.props;
		resetComicState();
	}

	renderContent() {
		const { fetchingCharacter, character , classes, match } = this.props;
		if(this.state.fetching || fetchingCharacter || !Object.keys(character).length)  {
			return (
				<CircularProgress
					className={ classes.progress }
					color="secondary"
					size={75}
				/>
			)
		}else {
			return (
				<div className={ classes.contentContainer }>
					<CharacterDetailsTopSection character={ character } />
					<div className={ classes.buttonContainer }>
						<Route path={`${match.url}/resources`} render={ (props) => <CharacterResourceList {...props} character={ character }/>} />
						<Route path={`${match.url}/Comics/:id`} render={ (props) => <ComicDetail {...props} character={ character }/>} />
						<Route path={`${match.url}/Events/:id`} render={ (props) => <EventDetail {...props} character={ character }/>} />
						<Route path={`${match.url}/Series/:id`} render={ (props) => <SeriesDetail {...props} character={ character }/>} />
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
	const { params } = props.match //match has the prop of params
	const { character } = state.charactersState;
	const fetchingCharacter = state.charactersState.fetching;
	return {
		params,
		character,
		fetchingCharacter
	}
}
const mapActionsToProp = {
	fetchCharacterById,
	resetComicState
}

export default compose(
	withStyles(styles, { name: 'CharacterContainer' }),
	connect(mapStateToProps, mapActionsToProp)
)(CharacterContainer);

