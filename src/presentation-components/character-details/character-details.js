import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from "material-ui/Typography";
import banner from '../../marvel_banner.jpg'

const styles = theme => ({
	container: {
		display: 'flex'
	},
	imageContainer: {
		display: 'flex',
		flexGrow: 1,
		flexFlow: 'wrap',
		justifyContent: 'center'
	},
	image:{
		width: '100%',
		filter: 'grayscale(100%)'
	},
	imageContainerItem:{
		marginTop: -140
	},
	imageAvaterContainer:{
		width: 890,
		display: 'flex',
		zIndex: 1,
		marginLeft: 'auto',
		marginRight: 'auto'
	},
	avatar:{
		border: '5px solid #fff',
		borderRadius: 150
	},
	name:{
		flexGrow: 5,
		alignSelf: 'center',
    	marginTop: 50,
    	marginLeft: 20
	}
});


const CharacterDetails = (props) => {
	const { classes, character } = props;
	return (
		<div className={ classes.container }>
			<div className={ classes.imageContainer }>
				<div className={ classes.imageContainerItem }>
					<img src={ banner } alt="banner" className={ classes.image }/>
				</div>
				<div className={ [classes.imageContainerItem, classes.imageAvaterContainer ].join(' ') }>
					<img className={ classes.avatar } src={ character.imageUrl('standard_fantastic') } alt={ character.name } />
					<Typography className={ classes.name } variant="headline" noWrap={ true } color="default">
						{ character.name }
					</Typography>
				</div>
			</div>
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