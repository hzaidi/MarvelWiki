import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import banner from '../../marvel_banner.jpg'

const styles = theme => ({
	container: {
		width: '90%',
		margin: '0 auto',
	},
	topSectionContainer:{
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap'
	},
	topBarBg:{
		position: 'absolute',
		top: 50,
		left: 0,
		right: 0,
		height: 200,
		filter: 'grayscale(100%)',
		backgroundImage: `url(${banner})`,
		boxShadow: '3px 3px 20px 6px #2b2b2b',
		zIndex: -1
	},
	avatar:{
		border: '5px solid #fff',
		borderRadius: 150,
		margin: '20px 20px 0',
		alignSelf: 'flex-end'
	},
	name:{
		alignSelf: 'flex-end',
		flexGrow: 2
	},
	content:{
		width: '90%',
		margin: '0 auto'
	}
});


const CharacterDetailsTopSection = (props) => {
	const { classes, character } = props;
	return (
		<div className={ classes.container }>
			<div className={ classes.topSectionContainer }>
				<div className={ classes.topBarBg }></div>
				<img className={ classes.avatar } src={ character.imageUrl('standard_fantastic') } alt={ character.name } />
				<Typography className={ classes.name } gutterBottom variant="display2" color="textSecondary">
					{ character.name }
				</Typography>
			</div>
			<div className={ classes.content }>
				contetn
			</div>
		</div>
	)
}


CharacterDetailsTopSection.propTypes = {
	character: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(CharacterDetailsTopSection);