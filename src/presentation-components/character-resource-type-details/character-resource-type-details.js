import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
	container: {

	},
	panelSummary: {
		backgroundColor: '#3b3b3b',
    	borderBottom: '1px solid #444343'
	},
	panelDetails:{
		paddingBottom: 0
	},
	panelAction:{
		paddingTop: 0
	},
	heading: {
		display: 'flex',
		width: '100%',
		fontSize: theme.typography.pxToRem(20),
		fontWeight: theme.typography.fontWeightRegular,
	},
	headerLeft:{

		flexGrow: 1
	},
	headerRight: {
		backgroundColor: '#fff'
	},
	chipContainer:{
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},
	chip: {
		margin: theme.spacing.unit,
	},
	linkButton: {
		margin: theme.spacing.unit,
	}
});


const CharacterResourceTypeDetails = (props) => {
	const { classes, resourceTypeData, resourceTypeString } = props;
	return (
			<ExpansionPanel>
				<ExpansionPanelSummary className={ classes.panelSummary } expandIcon={<ExpandMoreIcon />}>
					<Typography className={classes.heading}>
						<span className={ classes.headerLeft }>{ resourceTypeString }</span>
						<Tooltip id="tooltip-icon" title={ `${resourceTypeData.available} ${resourceTypeString}` }>
							<Button size="small" className={classes.button}>
								{ resourceTypeData.available }
							</Button>
						</Tooltip>
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className={ classes.panelDetails }>
					<div className={ classes.chipContainer }>
						{ resourceTypeData.items.map(c => <Chip key={ c.resourceURI } label={ c.name } className={classes.chip} />) }
					</div>
				</ExpansionPanelDetails>
				<ExpansionPanelActions className={ classes.panelAction }>
					<Button size="small" className={classes.button}>
						Details
					</Button>
				</ExpansionPanelActions>
			</ExpansionPanel>
	)
}


CharacterResourceTypeDetails.propTypes = {
	resourceTypeString: PropTypes.string.isRequired,
	resourceTypeData: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(CharacterResourceTypeDetails);