import React from 'react';
import Avatar from 'material-ui/Avatar';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from "material-ui/Typography";
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

const styles = theme => ({
	container: {
		display: 'flex',
		flexDirection: 'row'
	},
	card: {
		width: 220
	},
	media: {
		height: 0,
		paddingTop: '100%', // 16:9
	},
});


const CharacterTile = (props) => {
	const { classes } = props;
	return (
		<div>
			<Card className={classes.card}>
				<div>
					<Typography variant="caption" noWrap={ true } color="default">
						{ props.character.name }
					</Typography>
				</div>
				<CardMedia
				className={classes.media}
				image={ props.character.imageUrl('portrait_uncanny') }
				title={ props.character.name }
				/>
			</Card>
		</div>
	)
}


CharacterTile.propTypes = {
	character: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(CharacterTile);