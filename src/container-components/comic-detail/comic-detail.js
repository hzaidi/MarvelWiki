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
	},
	subParagraph:{
		margin: 0
	}
});

class ComicDetail extends Component {
	state = {
		fetching: true
	}
	componentDidMount() {
		const { fetchComicById, params } = this.props;
		fetchComicById(params.id).then(_ => this.setState({ fetching: false }));
	}

	contentMarkup(content) {
		return { __html: content };
	}

	renderContent(){
		const { fetchingComic, comic, classes } = this.props;
		if(this.state.fetching || fetchingComic || !Object.keys(comic).length)  {
			return (
				<CircularProgress
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
							{
								comic.description && comic.description.length > 0 &&
								<div className={ classes.sections }>
									<Typography
										className={ classes.description }
										gutterBottom
										variant="body1"
										dangerouslySetInnerHTML={ this.contentMarkup(comic.description) }
										color="textSecondary" />
								</div>
							}
							<div className={ classes.sections }>
								<Grid container spacing={16}>
									<Grid xs={12} sm={12} md={4} lg={4} item>
										<Typography gutterBottom variant="title" color="textSecondary">
											About the book
										</Typography>
										<div className={ classes.sections }>
											<Typography variant="subheading" color="textSecondary">
												Page Count:
											</Typography>
											<Typography variant="caption" color="textSecondary">
												{ comic.pageCount } Pages
											</Typography>
										</div>
										{
											comic.prices.length > 0 &&
												<div className={ classes.sections }>
													<Typography variant="subheading" color="textSecondary">
													Prices:
													</Typography>
													<Typography variant="caption" color="textSecondary">
														{
															comic.prices.map(p => {
																return <p className={ classes.subParagraph } key={p.type}>{ `${p.type} - ${p.price}` }</p>
															})
														}
													</Typography>
												</div>
										}
										{
											comic.isbn.length > 0 &&
												<div className={ classes.sections }>
													<Typography variant="subheading" color="textSecondary">
														ISBN:
													</Typography>
													<Typography variant="caption" color="textSecondary">
														{ comic.isbn }
													</Typography>
												</div>
										}
										{
											comic.dates.length > 0 &&
												<div className={ classes.sections }>
													<Typography variant="subheading" color="textSecondary">
														Dates:
													</Typography>
													<Typography variant="caption" color="textSecondary">
														{
															comic.dates.map(p => {
																return <p className={ classes.subParagraph } key={p.type}>{ `${p.type} - ${(new Date(p.date)).toLocaleDateString()}` }</p>
															})
														}
													</Typography>
												</div>
										}
									</Grid>
									<Grid xs={12} sm={12} md={8} lg={8} item>
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
	withStyles(styles, { name: 'ComicDetail' }),
	connect(mapStateToProps, mapActionsToProp)
)(ComicDetail);

