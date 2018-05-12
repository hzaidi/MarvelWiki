import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import { fetchCharacters, filterCharacters, onNavigation } from '../../actions/charactersActions';
import CharactersList from '../../presentation-components/characters-list/characters-list'
import { searchFilterObject } from '../../actions/charactersActions';

const styles = theme => ({
	container: {
		display: 'flex',
		justifyContent: 'center'
	},
	progress: {
	  	margin: theme.spacing.unit * 2,
	},
});


class CharactersContainer extends Component {

  	componentDidMount() {
		const { fetchCharacters } = this.props;
    	fetchCharacters(searchFilterObject);
	}

	onClickCharacter(id) {
		const { history } = this.props;
		history.push(`/character/${id}`);
	}

	onNavigationClick(direction) {
		const  { metaRecord, onNavigation } = this.props;
		onNavigation(metaRecord, direction);
	}

	renderContent() {
		const { metaRecord, fetching, classes, characters, filterCharacters, searching, onNavigation } = this.props;
		if (fetching || !Object.keys(characters).length) {
			return (
				<CircularProgress
					className={ classes.progress }
					color="secondary"
					size={75}
				/>
			)
		}else{
			return (
				<CharactersList
					metaRecord={ metaRecord }
					characters={ characters }
					onClickCharacter={ this.onClickCharacter.bind(this) }
					onFilter={ filterCharacters }
					onNavigation={ this.onNavigationClick.bind(this) }
					searching={ searching }
				/>
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
	const { characters, fetching, searching, metaRecord } = state.charactersState;
	return {
		characters,
		fetching,
		searching,
		metaRecord
	}
}
const mapActionsToProp = {
	fetchCharacters,
	filterCharacters,
	onNavigation
}

export default compose(
	withStyles(styles, { name: 'CharactersContainer' }),
	connect(mapStateToProps, mapActionsToProp)
)(CharactersContainer);

