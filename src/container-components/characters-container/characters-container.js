import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import { fetchCharacters, filterCharacters } from '../../actions/charactersActions';
import CharactersList from '../../presentation-components/characters-list/characters-list'

const styles = theme => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
		margin: '50px 100px'
	},
	progress: {
	  	margin: theme.spacing.unit * 2,
	},
});

const filterObject = {
	modifiedSince: '01/01/2010'
}


class CharactersContainer extends Component {

  	componentDidMount() {
    	this.props.fetchCharacters(filterObject);
	}

	onClickCharacter(id) {
		this.props.history.push(`/character/${id}`);
	}

	renderContent() {
		const { fetching, classes, characters, filterCharacters, searching } = this.props;
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
					onFilter={ filterCharacters }
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
	const { characters, fetching, searching } = state.charactersState;
	return {
		characters,
		fetching,
		searching
	}
}
const mapActionsToProp = {
	fetchCharacters,
	filterCharacters
}

export default compose(
	withStyles(styles, { name: 'CharactersContainer' }),
	connect(mapStateToProps, mapActionsToProp)
)(CharactersContainer);

