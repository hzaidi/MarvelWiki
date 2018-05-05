import React, { Component } from 'react';
import './characters-container.css';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import { fetchAllCharacters } from '../../actions/charactersActions';
import CharacterTile from '../../presentation-components/character-tile/character-tile'

class CharactersContainer extends Component {
  	constructor(props) {
    	super(props);
  	}
  	componentDidMount() {
    	this.props.onFetchAllCharacters();
	}

	renderContent() {
		if (this.props.fetching) {
			return (
				<CircularProgress />
			)
		}else{
			return (
				this.props.characters.map(c => <CharacterTile key={c.id} character={c}/>)
			)
		}
	}

	render() {
		return (
			<div className="characters-container">
				{ this.renderContent() }
			</div>
    	);
  	}
}

const mapStateToProps = (state, props) => {
	const { characters, fetching } = state.charactersState;
	return {
		characters,
		fetching
	}
}
const mapActionsToProp = {
	onFetchAllCharacters: fetchAllCharacters
}

export default connect(mapStateToProps, mapActionsToProp)(CharactersContainer)
