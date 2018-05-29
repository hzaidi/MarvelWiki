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
import ImageSlider from '../../presentation-components/image-slider/image-slider'
import { fetchComicById } from '../../actions/comicsActions'

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
	}
});

class CharacterResourceDetail extends Component {
	state = {
		fetching: true
	}
	componentDidMount() {
		const { fetchComicById, params } = this.props;
		fetchComicById(params.id).then(_ => this.setState({ fetching: false }));
	}



	renderContent(){
		const { fetchingComic, comic, classes } = this.props;
		if(this.state.fetching || fetchingComic || !Object.keys(comic).length)  {
			return (
				<CircularProgress
					className={ classes.progress }
					color="secondary"
					size={75}
				/>
			)
		}else {
			return (
				<div  className={ classes.contentContainer }>
					<Grid container spacing={16}>
						<Grid xs={12} sm={12} md={5} lg={5} item>
							<Typography variant="display1" color="textSecondary">
								{ comic.title }
							</Typography>
							<ImageSlider imagesUrl={ comic.imagesUrl }/>
						</Grid>
						<Grid xs={12} sm={12} md={7} lg={7} item>
							<div className={ classes.sections }>
								<Typography className={ classes.description } gutterBottom variant="body1" color="textSecondary">
									{ comic.description }
								</Typography>
							</div>
							<div className={ classes.sections }>
								<Typography variant="title" color="textSecondary">
									Characters in the Comic
								</Typography>
								{
									comic.characters.items.map(c => {
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
									Creators of the Comic
								</Typography>
								{
									comic.creators.items.map(c => {
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
	const { comic } = state.comicsState;
	const fetchingComic = state.comicsState.fetching;
	return {
		params,
		comic,
		fetchingComic,
		character
	}
}
const mapActionsToProp = {
	fetchComicById
}

export default compose(
	withStyles(styles, { name: 'CharacterResourceDetail' }),
	connect(mapStateToProps, mapActionsToProp)
)(CharacterResourceDetail);

