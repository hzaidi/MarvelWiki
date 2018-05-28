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
import ImageTile from '../../presentation-components/image-tile/image-tile';
import ImageSlider from '../../presentation-components/image-slider/image-slider'
import { fetchComicById } from '../../actions/comicsActions'

const styles = theme => ({
	container:{
		display: 'flex',
		justifyContent: 'center'
	},
	contentContainer: {
		width: '100%',
		boxSizing: 'border-box'
	},
	chip: {
		margin: theme.spacing.unit,
	}
});

class CharacterResourceDetail extends Component {
	state = {
		fetching: true
	}
	componentDidMount() {
		const { fetchComicById, params, comic } = this.props;
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
					<Grid container>
						<Grid xs={12} sm={12} md={5} lg={5} item>
							<ImageSlider imagesUrl={ comic.imagesUrl }/>
							{/* <div className={ classes.imagesContainer }>

								{
									comic.imagesUrl.map(url => {
										return <div key={ url } className={ classes.image }><ImageTile
											id={comic.id}
											title={ comic.title }
											imageUrl={ url }
											onClick={ () => {} }
											variant="headline"
											noWrap={ false }
											animateOnHover={ false }/></div>
										})
								}
							</div> */}
						</Grid>
						<Grid xs={12} sm={12} md={7} lg={7} item>
							<div>
								<Typography variant="body1" color="textSecondary">
									{ comic.description }
								</Typography>
							</div>
							<div>
								<Typography variant="body1" color="textSecondary">
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
							<div>
								<Typography variant="body1" color="textSecondary">
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
												label={ c.name }
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

