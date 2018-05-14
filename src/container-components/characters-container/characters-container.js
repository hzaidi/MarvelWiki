import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import { fetchCharacters, filterCharacters, onNavigation } from '../../actions/charactersActions';
import CharactersList from '../../presentation-components/characters-list/characters-list'
import { searchFilterObject } from '../../actions/charactersActions';
import CharacterSearchFilter from '../../presentation-components/character-search-filter/character-search-filter';

const styles = theme => ({
	container: {
		display: 'flex',
		justifyContent: 'center'
	},
	progress: {
	  	margin: theme.spacing.unit * 2,
	},
	sticky: {
		position: 'sticky',
		top: '64px;',
		zIndex: '100'
	}
});


class CharactersContainer extends Component {

  	componentDidMount() {
		const { fetchCharacters, metaRecord } = this.props;
    	fetchCharacters({ ...searchFilterObject, ...metaRecord });
	}

	onChangeFilterText(event) {
		const { filterCharacters, metaRecord } = this.props;
		event.persist();
		searchFilterObject.nameStartsWith = event.target.value;
		filterCharacters({ ...searchFilterObject, ...metaRecord });
	}

	onChangeOrderBy(event) {
		const { filterCharacters, metaRecord } = this.props;
		event.persist();
		searchFilterObject.orderBy = event.target.value;
		filterCharacters({ ...searchFilterObject, ...metaRecord });
	}

	onChangeModifiedSince(event) {
		const { filterCharacters, metaRecord } = this.props;
		event.persist();
		searchFilterObject.modifiedSince = `${event.target.value}-01-01`;
		filterCharacters({ ...searchFilterObject, ...metaRecord });
	}


	onClickCharacter(id) {
		const { history } = this.props;
		history.push(`/character/${id}`);
	}

	onNext() {
		this.onNavigationClick('next');
	}

	onPrevious() {
		this.onNavigationClick('previous');
	}

	onNavigationClick(direction) {
		const  { metaRecord, onNavigation } = this.props;
		onNavigation({ ...searchFilterObject, ...metaRecord }, direction);
	}

	renderContent() {
		const { fetching, classes, characters } = this.props;
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
					characters={ characters }
					onClickCharacter={ this.onClickCharacter.bind(this) }
				/>
			)
		}
	}


	render() {
		const { classes, metaRecord, searching } = this.props;
		return (
			<div>
				<div className={ classes.sticky }>
					<CharacterSearchFilter
						metaRecord={ metaRecord }
						searching={ searching }
						onChangeFilterText={ this.onChangeFilterText.bind(this) }
						onChangeOrderBy={ this.onChangeOrderBy.bind(this) }
						onChangeModifiedSince={ this.onChangeModifiedSince.bind(this) }
						onNext={ this.onNext.bind(this) }
						onPrevious={ this.onPrevious.bind(this) }
					/>
				</div>
				<div className={ classes.container }>
					{ this.renderContent() }
				</div>
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

