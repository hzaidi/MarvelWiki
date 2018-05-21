import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { fetchCharacters, filterCharacters, onLoadMore } from '../../actions/charactersActions';
import CharactersList from '../../presentation-components/characters-list/characters-list'
import { searchFilterObject } from '../../actions/charactersActions';
import CharacterSearchFilter from '../../presentation-components/character-search-filter/character-search-filter';
import CharactersLoading from '../../presentation-components/characters-loading/characters-loading';

const styles = theme => ({
	container: {
		width: '90%',
    	margin: '0 auto'
	},
	sticky: {
		position: 'sticky',
		top: 64,
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
		const { fetchCharacters, metaRecord } = this.props;
		event.persist();
		searchFilterObject.orderBy = event.target.value;
		fetchCharacters({ ...searchFilterObject, ...metaRecord });
	}

	onChangeModifiedSince(event) {
		const { fetchCharacters, metaRecord } = this.props;
		event.persist();
		searchFilterObject.modifiedSince = `${event.target.value}-01-01`;
		fetchCharacters({ ...searchFilterObject, ...metaRecord });
	}


	onClickCharacter(id) {
		const { history } = this.props;
		history.push(`/character/${id}`);
	}

	onNavigationTrigger() {
		const  { metaRecord, onLoadMore } = this.props;
		onLoadMore({ ...searchFilterObject, ...metaRecord });
	}

	renderContent() {
		const { fetching, characters, metaRecord } = this.props;
		if (fetching || !Object.keys(characters).length) {
			return (
					<CharactersLoading />
			)
		}else{
			return (
				<CharactersList
					characters={ characters }
					onClickCharacter={ this.onClickCharacter.bind(this) }
					loadMore={ this.onNavigationTrigger.bind(this) }
					metaRecord={ metaRecord }
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
	onLoadMore
}

export default compose(
	withStyles(styles, { name: 'CharactersContainer' }),
	connect(mapStateToProps, mapActionsToProp)
)(CharactersContainer);

