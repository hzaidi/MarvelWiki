import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import ImageTile from '../../presentation-components/image-tile/image-tile'
import { fetchEventById } from '../../actions/eventsActions'

const styles = theme => ({
	container:{
		display: 'flex',
		justifyContent: 'center'
	},
	contentContainer: {
		width: '90%',
		boxSizing: 'border-box',
		margin: '0 auto'
	},
	chip: {
		margin: theme.spacing.unit,
	},
	description:{
		backgroundColor: '#2e2e2e',
		padding: 10,
		borderRadius: 10,
		boxShadow: '3px 3px 20px 2px #2b2b2b',
	},
	sections:{
		marginBottom: 20
	},
	subParagraph:{
		margin: 0
	}
});

class EventDetail extends Component {
	state = {
		fetching: true
	}
	componentDidMount() {
		const { fetchEventById, params } = this.props;
		fetchEventById(params.id).then(_ => this.setState({ fetching: false }));
	}

	contentMarkup(content) {
		return { __html: content };
	}

	renderContent(){
		const { fetchingEvent, event, classes } = this.props;
		if(this.state.fetching || fetchingEvent || !Object.keys(event).length)  {
			return (
				<CircularProgress
					color="secondary"
					size={75}
				/>
			)
		}else{
			return (
				<div className={ classes.contentContainer }>
					<Grid container spacing={16}>
						<Grid xs={12} sm={12} md={5} lg={5} item>
							<ImageTile
								id={event.id}
								title={ event.title }
								imageSize="portrait_fantastic"
								imageUrl={ event.imageUrl }
								animateOnHover={ false }
								onClick={ () => {} }/>
						</Grid>
						<Grid xs={12} sm={12} md={7} lg={7} item>
							{
								event.description && event.description.length > 0 &&
								<div className={ classes.sections }>
									<Typography
										className={ classes.description }
										gutterBottom
										variant="body1"
										dangerouslySetInnerHTML={ this.contentMarkup(event.description) }
										color="textSecondary" />
								</div>
							}
							<div className={ classes.sections }>
								<Grid container spacing={16}>
									<Grid xs={12} sm={12} md={4} lg={4} item>
										<div className={ classes.sections }>
											<Typography gutterBottom variant="title" color="textSecondary">
												Duration of Event
											</Typography>
											<Typography gutterBottom variant="title" color="textSecondary">
												{ `${(new Date(event.start)).toLocaleDateString()} - ${(new Date(event.end)).toLocaleDateString()}` }
											</Typography>
										</div>
										{
											event.next &&
											<div className={ classes.sections }>
												<Typography variant="subheading" color="textSecondary">
													Next Event: { `${event.next.name}` }
												</Typography>
											</div>
										}
										{
											event.previous &&
											<div className={ classes.sections }>
												<Typography variant="subheading" color="textSecondary">
													Previous Event: { `${event.previous.name}` }
												</Typography>
											</div>
										}
									</Grid>
									<Grid xs={12} sm={12} md={8} lg={8} item>
										<div className={ classes.sections }>
											<Typography variant="title" color="textSecondary">
												Characters in the Event
											</Typography>
											{
												event.characters.items.map(c => {
													return <Chip key={ c.resourceURI }
															avatar={
																<Avatar>
																	<FaceIcon />
																</Avatar>
															}
															label={ c.name }
															className={classes.chip}
													/>
												})
											}
										</div>
										<div className={ classes.sections }>
											<Typography variant="title" color="textSecondary">
												Creators of the Event
											</Typography>
											{
												event.creators.items.map(c => {
													return <Chip key={ c.resourceURI }
															avatar={
																<Avatar>
																	<FaceIcon />
																</Avatar>
															}
															label={ `${c.name} - ${c.role}` }
															className={classes.chip}
													/>
												})
											}
										</div>
									</Grid>
								</Grid>
							</div>
						</Grid>
					</Grid>
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
	const { character } = state.charactersState;
	const { params } = props.match;
	const { event } = state.eventsState;
	const fetchingEvent = state.eventsState.fetching;
	return {
		params,
		event,
		fetchingEvent,
		character
	}
}
const mapActionsToProp = {
	fetchEventById
}

export default compose(
	withStyles(styles, { name: 'EventDetail' }),
	connect(mapStateToProps, mapActionsToProp)
)(EventDetail);

