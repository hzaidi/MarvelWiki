import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';
import banner from '../../marvel_banner.jpg'

const styles = theme => ({
	container: {
		width: '90%',
		margin: '0 auto',
	},
	topSectionContainer:{
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		width: '100%'
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
	},
	root: theme.mixins.gutters({
		paddingTop: 16,
		paddingBottom: 16,
		marginTop: theme.spacing.unit * 3,
		marginBottom: theme.spacing.unit * 3,
	}),
});


const CharacterDetailsTopSection = (props) => {
	const { classes, character } = props;
	return (
		<div className={ classes.container }>
			<div className={ classes.topSectionContainer }>
				<div className={ classes.topBarBg }></div>
				<Grow in={ character != null }>
					<img className={ classes.avatar } src={ character.imageUrl('standard_fantastic') } alt={ character.name } />
				</Grow>
				<Slide direction="left" in={ character != null } mountOnEnter unmountOnExit>
					<div className={ classes.name }>
						<Typography  gutterBottom variant="display2" color="textSecondary">
							{ character.name }
						</Typography>
					</div>
				</Slide>
			</div>
			<div className={ classes.content }>
			{
				character.description ?
						<Paper className={classes.root} elevation={4}>
							<Typography component="p">
								{ character.description }
							</Typography>
						</Paper>
					: null
			}
			</div>
		</div>
	)
}


CharacterDetailsTopSection.propTypes = {
	character: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(CharacterDetailsTopSection);