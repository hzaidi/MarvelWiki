import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from "material-ui/Typography";
import banner from '../../marvel_banner.jpg'
import Grid from 'material-ui/Grid';

const styles = theme => ({
	container: {
		width: '100%',
	},
	topSectionContainer:{
		position: 'relative',

	},
	topBarBg:{
		position: 'absolute',
		top: 0,
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
		margin: '65px 40px 0'
	},
	name:{
		position: 'absolute',
		top: '13.2rem',
		left: '19.5rem'
	}
});


const CharacterDetails = (props) => {
	const { classes, character } = props;
	return (
		<div className={ classes.container }>
			<Grid spacing={8} container>
				<Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
					<div className={ classes.topSectionContainer }>
						<div className={ classes.topBarBg }></div>
						<img className={ classes.avatar } src={ character.imageUrl('standard_fantastic') } alt={ character.name } />
						<Typography className={ classes.name } gutterBottom variant="display2" noWrap={ true } color="textSecondary">
							{ character.name }
						</Typography>
					</div>
				</Grid>
				<Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
					<Typography variant="headline" noWrap={ true } color="default">
						{ character.name }
					</Typography>
				</Grid>
			</Grid>
			{/* <div className={ classes.imageContainer }>
				<div className={ classes.imageContainerItem }>
					<img src={ banner } alt="banner" className={ classes.image }/>
				</div>
				<div className={ [classes.imageContainerItem, classes.imageAvaterContainer ].join(' ') }>
					<img className={ classes.avatar } src={ character.imageUrl('standard_fantastic') } alt={ character.name } />
					<Typography className={ classes.name } variant="headline" noWrap={ true } color="default">
						{ character.name }
					</Typography>
				</div>
			</div> */}
			{/* <div className={ classes.contentContainer }>

			</div> */}
		</div>
	)
}


CharacterDetails.propTypes = {
	character: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(CharacterDetails);