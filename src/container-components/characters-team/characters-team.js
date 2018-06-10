import React, { Component } 	from 'react';
import { compose } 				from 'redux';
import { connect } 				from 'react-redux';
import { objectToArray }		from '../../helper/objectHelper';
import { withStyles } 			from '@material-ui/core/styles';
import Tooltip 					from '@material-ui/core/Tooltip';
import InputAdornment 			from '@material-ui/core/InputAdornment'
import TextField 				from '@material-ui/core/TextField';
import SearchCircle 			from '@material-ui/icons/Search';
import CircularProgress 		from '@material-ui/core/CircularProgress';
import Modal 					from '@material-ui/core/Modal';
import Avatar 					from '@material-ui/core/Avatar';
import CharactersGroup			from '../../presentation-components/characters-group/characters-group'
import { onGetCharacterByName } from '../../actions/charactersActions'

const styles = theme => ({
	modal: {
		background: '#2e2e2e',
		width: 500,
		padding: 20,
	},
	avatarContainer:{
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		height: 150
	},
	avatar: {
		cursor: 'pointer',
		alignSelf: 'center',
		margin: 10,
		width: 80,
		height: 80,
		transition: '0.40s',
		border: '2px solid transparent',
		'&:hover':{
			transition: '0.40s',
			border: '2px solid #fff',
			transform: 'scale(1.3)'
		}
	},
	textField:{
		width: '100%'
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
		searching: false,
		filterCharacters: [],
		selectedCharacters: []
	};

	handleOpen = (row, col) => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false, filterCharacters: [] });
	};
	onChangeFilterText = (evt) => {
		const { onGetCharacterByName } = this.props;
		const searchText = evt.target.value;
		if(!searchText.length) {
			this.setState({ filterCharacters: [] })
		}else{
			onGetCharacterByName(searchText).then(snapshot => {
				const snapshotValue = snapshot.val();
				var values = (snapshotValue) ? objectToArray(snapshotValue) : [];
				this.setState({ filterCharacters: values.slice(0, 4) })
			});
		}
	}
	onCharacterSelect = (character) => {
		this.setState({ selectedCharacters: [...this.state.selectedCharacters, character] })
		this.handleClose()
	}

	removeCharacter = (character) => {
		this.setState({ selectedCharacters: this.state.selectedCharacters.filter(c => c !== character)})
	}

  	render() {
		const { classes } = this.props;
		return (
			<div>
				<TextField
					className={ classes.textField  }
					id="with-placeholder"
					label="Team Name"
					placeholder="Name of the team e.g. Avengers"
					className={classes.textField}
					margin="normal"
				/>
				<CharactersGroup
					openModal={ this.handleOpen }
					selectedCharacters={ this.state.selectedCharacters }
					removeCharacter={ this.removeCharacter }
					/>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.handleClose}
				>
				<div style={getModalStyle()} className={classes.modal}>
					<TextField
						className={ classes.textField  }
						type="search"
						label="Search your hero"
						onChange={ this.onChangeFilterText.bind(this) }
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									{ this.state.searching ? <CircularProgress color="secondary" size={25} /> : <SearchCircle /> }
								</InputAdornment>
							),
						}}
					/>
					<div className={ classes.avatarContainer }>
					{
						this.state.filterCharacters.map(character => {
							return	<Tooltip enterDelay={300} key={ character.id } title={ character.name } placement="bottom">
										<Avatar
											onClick={ () => this.onCharacterSelect(character) }
											key={ character.id }
											className={ classes.avatar }
											alt={ character.name }
											src={ `${character.thumbnail.path}.${character.thumbnail.extension}` }
										/>
									</Tooltip>
						})
					}
					</div>
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
	onGetCharacterByName
}

export default compose(
	withStyles(styles, { name: 'CharactersTeam' }),
	connect(mapStateToProps, mapActionsToProp)
)(CharactersTeam);

