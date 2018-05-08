import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import { fetchCharacterById } from '../../actions/charactersActions';

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

class CharacterContainer extends Component {

	componentDidMount() {
    	this.props.fetchCharacterById(this.props.params.characterId);
	}

	renderContent() {
		const { fetching, character , classes} = this.props;
		if(fetching || !Object.keys(character).length)  {
			return (
				<CircularProgress
					className={ classes.progress }
					color="secondary"
					size={75}
				/>
			)
		}else {
			return (
				<img src={character.imageUrl()} alt=""/>
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
	const { character, fetching } = state.charactersState;
	return {
		params,
		character,
		fetching
	}
}
const mapActionsToProp = {
	fetchCharacterById
}

export default compose(
	withStyles(styles, { name: 'CharacterContainer' }),
	connect(mapStateToProps, mapActionsToProp)
)(CharacterContainer);

