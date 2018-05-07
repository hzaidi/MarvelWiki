import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import { fetchCharacters, searchCharacter } from '../../actions/charactersActions';
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

class CharactersContainer extends Component {

  	componentDidMount() {
    	this.props.fetchCharacters();
	}

	onClickCharacter() {
		this.props.history.push('/character/123');
	}

	renderContent() {
		const { fetching, classes, characters, searchCharacter, searching } = this.props;
		if (fetching) {
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
					onSearch={ searchCharacter }
					searching={ searching }
				/>
			)
		}
	}


	render() {
		return (
			<div className={this.props.classes.container}>
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
	searchCharacter
}

export default compose(
	withStyles(styles, { name: 'CharactersContainer' }),
	connect(mapStateToProps, mapActionsToProp)
)(CharactersContainer);

