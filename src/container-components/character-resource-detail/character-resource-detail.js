import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

});

class CharacterResourceDetail extends Component {
  	render() {
		return (
			<div>
				this is a details component
			</div>
		);
  	}
}

const mapStateToProps = (state, props) => {
	const { character } = state.charactersState;
	return {
		character
	}
}
const mapActionsToProp = {

}

export default compose(
	withStyles(styles, { name: 'CharacterResourceDetail' }),
	connect(mapStateToProps, mapActionsToProp)
)(CharacterResourceDetail);

