import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { fetchCharacters, filterCharacters, onLoadMore } from '../../actions/charactersActions';
import CharactersList from '../../presentation-components/characters-list/characters-list'
import CharacterSearchFilter from '../../presentation-components/character-search-filter/character-search-filter';
import ImageTileLoading from '../../presentation-components/image-tile-loading/image-tile-loading';

const styles = theme => ({
	container: {
		width: '90%',
		margin: '0 auto',
		paddingTop: 120
	},
	sticky: {
		position: 'fixed',
		top: 0,
		zIndex: '100',
		width: '100%'
	}
});


class CharactersContainer extends Component {

  	componentDidMount() {
		const { fetchCharacters,  collection, filter } = this.props;
		/*
			This if check ensures you are not coming to this componenet for the first time
			and does not make the call that can add duplicate records
		*/
		if(!collection.length){	fetchCharacters(filter); }
	}

	onChangeFilterText(event) {
		const { filterCharacters, filter } = this.props;
		event.persist();
		const updatedFilter = Object.assign({}, filter, { nameStartsWith: event.target.value });
		filterCharacters(updatedFilter);
	}

	onChangeOrderBy(event) {
		const { fetchCharacters, filter } = this.props;
		event.persist();
		const updatedFilter = Object.assign({}, filter, { orderBy: event.target.value });
		fetchCharacters(updatedFilter);
	}

	onChangeModifiedSince(event) {
		const { fetchCharacters, filter } = this.props;
		event.persist();
		const updatedFilter = Object.assign({}, filter, { modifiedSince: `${event.target.value}-01-01` });
		fetchCharacters(updatedFilter);
	}


	onClickCharacter(id) {
		const { history } = this.props;
		history.push(`/character/${id}/resources`);
	}

	onLoadMoreTrigger() {
		const  { onLoadMore, filter } = this.props;
		onLoadMore(filter);
	}

	renderContent() {
		const { fetching, collection, filter } = this.props;
		if (fetching || !Object.keys(collection).length) {
			return (
					<ImageTileLoading xs={6} sm={4} md={3} lg={2}/>
			)
		}else{
			return (
				<CharactersList
					characters={ collection }
					onClickCharacter={ this.onClickCharacter.bind(this) }
					loadMore={ this.onLoadMoreTrigger.bind(this) }
					filter={ filter }
				/>
			)
		}
	}


	render() {
		const { classes, searching, filter } = this.props;
		return (
			<div>
				<div className={ classes.sticky }>
					<CharacterSearchFilter
						filter={ filter }
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
	const { collection, fetching, searching, filter } = state.charactersState;
	return {
		collection,
		fetching,
		searching,
		filter
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

