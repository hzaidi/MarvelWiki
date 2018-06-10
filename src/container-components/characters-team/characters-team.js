import React, { Component } 	from 'react';
import { compose } 				from 'redux';
import { connect } 				from 'react-redux';
import { withStyles } 			from '@material-ui/core/styles';
import Typography 				from '@material-ui/core/Typography';
import Modal 					from '@material-ui/core/Modal';
import TextField 				from '@material-ui/core/TextField';
import CharactersGroup			from '../../presentation-components/characters-group/characters-group'

const styles = theme => ({
	modal: {
		background: '#2e2e2e'
	}
});

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		margin: 'auto'
	};
}

class CharactersTeam extends Component {
	state = {
		open: false,
		searching: false
	};
	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};
	onChangeFilterText = () => {

	}
  	render() {
		const { classes } = this.props;
		return (
			<div>
				<TextField
					id="with-placeholder"
					label="With placeholder"
					placeholder="Placeholder"
					className={classes.textField}
					margin="normal"
				/>
				<CharactersGroup add={ this.handleOpen } />
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.handleClose}
				>
				<div style={getModalStyle()} className={classes.modal}>
					<Typography variant="title" id="modal-title">
						Text in a modal
					</Typography>
					<Typography variant="subheading" id="simple-modal-description">
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography>
				</div>
				</Modal>
			</div>
		);
  	}
}

const mapStateToProps = (state, props) => {
	return {

	}
}
const mapActionsToProp = {

}

export default compose(
	withStyles(styles, { name: 'CharactersTeam' }),
	connect(mapStateToProps, mapActionsToProp)
)(CharactersTeam);

