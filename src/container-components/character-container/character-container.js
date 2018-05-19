import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchCharacterById } from '../../actions/charactersActions';
import CharacterDetailsTopSection from '../../presentation-components/character-details-top-section/character-details-top-section'
import CharacterDetailsContentSection from '../../presentation-components/character-details-content-section/character-details-content-section'

const styles = theme => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
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
				<div>
					<CharacterDetailsTopSection character={ character } />
					<CharacterDetailsContentSection character={ character }/>
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

