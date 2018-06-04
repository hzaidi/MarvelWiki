import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { fetchCharacters,
	filterCharacters,
	onLoadMore,
	onCharacterLike,
	onCharacterDislike,
	onCharacterLove,
	likesRef,
	lovesRef,
	dislikesRef
} from '../../actions/charactersActions';
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
		const { fetchCharacters, likesRef, lovesRef, dislikesRef, collection, filter } = this.props;
		if(!collection.length) { Promise.all([ likesRef(), lovesRef(), dislikesRef() ]).then(_ => fetchCharacters(filter)); }
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

	onLove(characterId) {
		const { isAuthenticated, onCharacterLove, user } = this.props;
		if(isAuthenticated) { onCharacterLove(characterId, user); }
	}

	onLike(characterId) {
		const { isAuthenticated, onCharacterLike, user } = this.props;
		if(isAuthenticated) { onCharacterLike(characterId, user); }
	}

	onDislike(characterId) {
		const { isAuthenticated, onCharacterDislike, user } = this.props;
		if(isAuthenticated) { onCharacterDislike(characterId, user); }
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
					onLove={ this.onLove.bind(this) }
					onLike={ this.onLike.bind(this) }
					onDislike={ this.onDislike.bind(this) }
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
	const { user, isAuthenticated } = state.userState;
	return {
		collection,
		fetching,
		searching,
		filter,
		user,
		isAuthenticated
	}
}
const mapActionsToProp = {
	fetchCharacters,
	filterCharacters,
	onLoadMore,
	onCharacterLike,
	onCharacterLove,
	onCharacterDislike,
	likesRef,
	lovesRef,
	dislikesRef
}

export default compose(
	withStyles(styles, { name: 'CharactersContainer' }),
	connect(mapStateToProps, mapActionsToProp)
)(CharactersContainer);

